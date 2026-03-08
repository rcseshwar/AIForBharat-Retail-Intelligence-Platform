import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create demo users
  const freeUserPassword = await bcrypt.hash('password123', 12)
  const proUserPassword = await bcrypt.hash('password123', 12)

  const freeUser = await prisma.user.upsert({
    where: { email: 'free@demo.com' },
    update: {
      organizationId: 'demo-org'
    },
    create: {
      email: 'free@demo.com',
      name: 'Free Demo User',
      password: freeUserPassword,
      accountType: 'FREE',
      aiQueriesLimit: 5,
      aiQueriesUsed: 0,
      organizationId: 'demo-org'
    }
  })

  const proUser = await prisma.user.upsert({
    where: { email: 'pro@demo.com' },
    update: {
      organizationId: 'demo-org'
    },
    create: {
      email: 'pro@demo.com',
      name: 'Pro Demo User',
      password: proUserPassword,
      accountType: 'PRO',
      aiQueriesLimit: 999999,
      aiQueriesUsed: 0,
      organizationId: 'demo-org'
    }
  })

  // Create subscription for pro user
  await prisma.subscription.upsert({
    where: { userId: proUser.id },
    update: {},
    create: {
      userId: proUser.id,
      accountType: 'PRO',
      status: 'ACTIVE',
      amount: 29.00,
      currency: 'USD',
      paymentMethod: 'credit_card',
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  })

  console.log('👤 Demo users created:')
  console.log('   Free User: free@demo.com / password123')
  console.log('   Pro User: pro@demo.com / password123')

  // Create organization
  const organization = await prisma.organization.upsert({
    where: { id: 'demo-org' },
    update: {},
    create: {
      id: 'demo-org',
      name: 'Demo Retail Company',
      industry: 'Retail'
    }
  })

  // Create sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'WH-001' },
      update: {},
      create: {
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 199.99,
        cost: 120.00,
        sku: 'WH-001',
        description: 'Premium wireless headphones with noise cancellation',
        organizationId: organization.id
      }
    }),
    prisma.product.upsert({
      where: { sku: 'SW-001' },
      update: {},
      create: {
        name: 'Smart Watch',
        category: 'Electronics',
        price: 299.99,
        cost: 180.00,
        sku: 'SW-001',
        description: 'Fitness tracking smart watch with GPS',
        organizationId: organization.id
      }
    }),
    prisma.product.upsert({
      where: { sku: 'CM-001' },
      update: {},
      create: {
        name: 'Coffee Maker',
        category: 'Appliances',
        price: 149.99,
        cost: 90.00,
        sku: 'CM-001',
        description: 'Programmable drip coffee maker',
        organizationId: organization.id
      }
    })
  ])

  // Clear existing customers and create sample customers
  await prisma.customer.deleteMany({})
  
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        email: 'customer1@example.com',
        name: 'John Smith',
        segment: 'Premium',
        lifetimeValue: 1250.00,
        acquisitionDate: new Date('2023-01-15'),
        region: 'North America',
        organizationId: organization.id
      }
    }),
    prisma.customer.create({
      data: {
        email: 'customer2@example.com',
        name: 'Sarah Johnson',
        segment: 'Standard',
        lifetimeValue: 650.00,
        acquisitionDate: new Date('2023-03-22'),
        region: 'Europe',
        organizationId: organization.id
      }
    }),
    prisma.customer.create({
      data: {
        email: 'customer3@example.com',
        name: 'Mike Chen',
        segment: 'Premium',
        lifetimeValue: 2100.00,
        acquisitionDate: new Date('2022-11-08'),
        region: 'Asia Pacific',
        organizationId: organization.id
      }
    })
  ])

  // Clear existing sales data and create new sample sales data
  await prisma.sale.deleteMany({})
  
  const salesData = []
  const startDate = new Date('2023-01-01')
  const endDate = new Date()
  
  for (let i = 0; i < 100; i++) {
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)]
    const quantity = Math.floor(Math.random() * 5) + 1
    const revenue = randomProduct.price.toNumber() * quantity

    salesData.push({
      productId: randomProduct.id,
      customerId: randomCustomer.id,
      quantity,
      revenue,
      timestamp: randomDate,
      channel: ['online', 'retail', 'mobile'][Math.floor(Math.random() * 3)],
      region: randomCustomer.region
    })
  }

  await prisma.sale.createMany({
    data: salesData
  })

  // Clear and create sample market data
  await prisma.marketData.deleteMany({})
  
  const marketData = [
    {
      region: 'North America',
      category: 'Electronics',
      metric: 'market_size',
      value: 125000000,
      source: 'Industry Report',
      organizationId: organization.id
    },
    {
      region: 'Europe',
      category: 'Electronics',
      metric: 'market_size',
      value: 98000000,
      source: 'Industry Report',
      organizationId: organization.id
    },
    {
      region: 'Asia Pacific',
      category: 'Electronics',
      metric: 'market_size',
      value: 156000000,
      source: 'Industry Report',
      organizationId: organization.id
    },
    {
      region: 'Global',
      category: 'Appliances',
      metric: 'growth_rate',
      value: 0.08,
      source: 'Market Research',
      organizationId: organization.id
    }
  ]

  await prisma.marketData.createMany({
    data: marketData
  })

  // Clear and create competitor pricing data
  await prisma.competitorPrice.deleteMany({})
  
  const competitorPrices = [
    {
      productId: products[0].id,
      competitor: 'TechCorp',
      price: 189.99,
      source: 'Price Monitor'
    },
    {
      productId: products[0].id,
      competitor: 'AudioMax',
      price: 209.99,
      source: 'Price Monitor'
    },
    {
      productId: products[1].id,
      competitor: 'WearableTech',
      price: 279.99,
      source: 'Price Monitor'
    },
    {
      productId: products[1].id,
      competitor: 'FitnessPro',
      price: 319.99,
      source: 'Price Monitor'
    }
  ]

  await prisma.competitorPrice.createMany({
    data: competitorPrices
  })

  // Clear and create system prompts (using demo session ID as updatedBy)
  await prisma.systemPrompt.deleteMany({})
  
  await prisma.systemPrompt.create({
    data: {
      name: 'Default AI Assistant',
      content: `You are an AI-powered retail intelligence assistant. Your role is to help retail teams, marketplace operators, and small business owners make data-driven decisions.

Key guidelines:
- Always provide clear, actionable insights
- Reference specific data when making recommendations
- Explain your reasoning and confidence levels
- Ask clarifying questions when needed
- Focus on business impact and ROI
- Be transparent about data limitations

When analyzing data:
- Look for patterns, trends, and anomalies
- Consider seasonal factors and market conditions
- Provide context for your recommendations
- Suggest specific next steps

Remember: You're helping real businesses make important decisions. Be accurate, helpful, and professional.`,
      isActive: true,
      version: 1,
      updatedBy: 'demo-session'
    }
  })

  // Clear and create compliance rules
  await prisma.complianceRule.deleteMany({})
  
  await prisma.complianceRule.createMany({
    data: [
      {
        name: 'Price Discrimination Check',
        description: 'Ensure pricing practices comply with anti-discrimination laws',
        regulation: 'Consumer Protection Act',
        category: 'Pricing'
      },
      {
        name: 'Data Privacy Compliance',
        description: 'Customer data handling must comply with GDPR/CCPA',
        regulation: 'GDPR',
        category: 'Data Protection'
      },
      {
        name: 'Financial Reporting Standards',
        description: 'Revenue recognition and financial reporting compliance',
        regulation: 'GAAP',
        category: 'Financial'
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log('🎯 Demo data created for free/pro user system')
  console.log('📊 Sample products, customers, and sales data added')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })