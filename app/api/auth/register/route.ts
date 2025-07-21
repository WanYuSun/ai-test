import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少8位'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 验证输入数据
    const validatedData = registerSchema.parse(body)
    const { name, email, password } = validatedData

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: '该邮箱已经被注册' }, { status: 400 })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        credits: 100, // 新用户赠送100积分
      },
      select: {
        id: true,
        name: true,
        email: true,
        credits: true,
        plan: true,
        createdAt: true,
      },
    })

    // 创建积分历史记录
    await prisma.creditHistory.create({
      data: {
        userId: user.id,
        amount: 100,
        type: 'BONUS',
        description: '新用户注册奖励',
        balance: 100,
      },
    })

    return NextResponse.json(
      {
        message: '注册成功',
        user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
  }
}
