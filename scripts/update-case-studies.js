import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load .env manually
const envPath = path.join(__dirname, '../.env')
const env = {}
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
    const idx = line.indexOf('=')
    if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  })
}

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseKey = env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  // 1. Update Global Tech Industries tag → Web Development
  console.log('Updating Global Tech Industries tag...')
  const { data: updated, error: updateErr } = await supabase
    .from('case_studies')
    .update({ tag: 'Web Development' })
    .eq('id', 2)
    .select('id, company, tag')

  if (updateErr) {
    console.error('Update error:', updateErr.message)
    process.exit(1)
  }
  console.log('Updated:', updated)

  // 2. Verify both entries
  console.log('\nVerifying all case studies:')
  const { data, error } = await supabase
    .from('case_studies')
    .select('id, company, tag, tech_used, link')
    .order('id', { ascending: true })

  if (error) {
    console.error('Fetch error:', error.message)
    process.exit(1)
  }
  console.log(JSON.stringify(data, null, 2))
}

run()
