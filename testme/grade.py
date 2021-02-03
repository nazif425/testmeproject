def grade(test_data, result):
   grade = int(result.score / (test_data.points_per_mark * result.total) * 100)
   if grade >= 70:
         grade = "A"
   elif grade >= 60:
         grade = "B"
   elif grade >= 50:
         grade = "C"
   elif grade >= 45:
         grade = "D"
   elif grade >= 40:
         grade = "E"
   else:
         grade = "F"
   return grade