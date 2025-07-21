import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少8位'),
})

// 简单的内存存储（仅用于演示，生产环境应使用数据库）
const users: Array<{
  id: string
  name: string
  email: string
  password: string
  credits: number
  plan: string
  createdAt: Date
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 验证输入数据
    const validatedData = registerSchema.parse(body)
    const { name, email, password } = validatedData

    // 检查用户是否已存在
    const existingUser = users.find((user) => user.email === email)

    if (existingUser) {
      return NextResponse.json({ message: '该邮箱已经被注册' }, { status: 400 })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12)

    // 创建用户（模拟数据库操作）
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      credits: 100, // 新用户赠送100积分
      plan: 'free',
      createdAt: new Date(),
    }

    // 添加到内存存储
    users.push(newUser)

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        message: '注册成功',
        user: userWithoutPassword,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 })
    }

    return NextResponse.json({ message: '服务器内部错误' }, { status: 500 })
  }
}
