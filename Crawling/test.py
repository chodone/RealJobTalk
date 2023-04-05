from datetime import datetime



date_time_str = "Thu, 06 Apr 2023 00:32:00 +0900"

print()


date_obj = datetime.strptime(' '.join(date_time_str.split(', ')[1].split(' ')[:3]), '%d %b %Y')

result = date_obj.strftime("%Y%m%d")
print(result)
