import tabula
# Extaer los datos del pdf al DataFrame
df = tabula.read_pdf("fff.pdf", pages='1')
# lo convierte en un csv llamdo out.csv codificado con utf-8

for d in df:
    d.to_csv('out.csv', sep='\t', encoding='utf-8')