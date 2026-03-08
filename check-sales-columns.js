const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkSalesColumns() {
  try {
    const result = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'sales' 
      ORDER BY ordinal_position;
    `
    
    console.log('Sales table columns (exact case):')
    result.forEach(col => {
      console.log(`  ${col.column_name} (${col.data_type})`)
    })
    
    // Test a simple query to see what works
    console.log('\nTesting simple sales query...')
    const testQuery = await prisma.$queryRaw`
      SELECT id, "productId", "customerId", quantity, revenue 
      FROM sales 
      LIMIT 3;
    `
    
    console.log('Test query result:')
    console.log(testQuery)
    
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkSalesColumns()