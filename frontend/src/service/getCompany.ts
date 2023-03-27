import path from 'path'
import { promises as fs } from 'fs'

export interface Company{
  company: string;
  url: string;
}

export async function getCompanies(): Promise<Company[]> {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data)
}

export async function getcompany(company:string): Promise<Company | undefined> {
  const products = await getCompanies();
  return products.find((item) => item.company === company);
}