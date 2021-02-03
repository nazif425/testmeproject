from .models import SiteGroup
from .models import Result
import datetime
import time
import logging
logger = logging.getLogger(__name__)
def get_result(results):
   hold_results = []
   for result in results:
      data = {}
      data['id'] = result.id
      data['test_id'] = result.test_data.id
      data['username'] = result.user.username
      data['name'] = result.user.get_full_name()
      data['test'] = result.test_data.name
      data['score'] = result.score
      data['grade'] = result.grade
      elapsed = str(time.strftime("%H:%M:%S", time.gmtime(result.time_elapsed)))
      data['time_elapsed'] = elapsed
      if result.started:
         data['started'] = result.started.strftime("%A,%b %d, %Y. %I:%M %p")
         #data['started'] = int(time.mktime(result.started.timetuple())) * 1000 # convert datetime to time in millisec
      if result.submitted:
         data['submitted'] = result.started.strftime("%A,%b %d, %Y. %I:%M %p")
         #data['submitted'] = int(time.mktime(result.submitted.timetuple())) * 1000
      data['status'] = result.result_status
      data['correct'] = result.correct
      data['incorrect'] = result.incorrect
      data['group'] = SiteGroup.objects.filter(tests=result.test_data)[0].name
      if data['status'] == 'Pending':
         data.update({'correct': '---','incorrect': '---', 'score': '---', 'grade': '---'})
      hold_results.append(data)
   return hold_results

def get_group(self, data):
   #set sitegroup perperties for group users
   for index, sitegroup in enumerate(data):
      author = self.get_queryset().filter(id=data[index].get('id', 0))[0].author
      users = data[index].get('users', [])
      tests = data[index].get('tests', [])
      data[index].update({'author': author.get_full_name()})
      data[index].update({'total_users': len(users)})
      data[index].update({'total_tests': len(tests)})
      if author == self.request.user:
         data[index].update({'is_author': True})
      if not self.request.user.is_author:
         data[index].pop('max_users')
         data[index].pop('access')
         data[index].pop('users')
         data[index].pop('tests')
   return data

def get_test(self, data):
   for index, test_data in enumerate(data):
      data[index].update({'is_author': False, 'result_available': False, 'start_test': False})
      test = self.get_queryset().filter(id=test_data['id'])[0]
      result = Result.objects.filter(user=self.request.user, test_data=test, submitted__isnull=False)
      if test.author == self.request.user:
         data[index].update({'is_author': True})
      if result.count() < test.allowed_attempts:
         data[index].update({'start_test': True})
      if result.exists():
         data[index].update({'status': "Completed"})
      if test.view_result and result.filter(result_status="Completed").exists():
         data[index].update({'result_available': True})
      if test.start_date:
         data[index].update({'start_date': test.start_date.strftime("%A,%b %d, %Y. %I:%M %p")})
      if test.end_date:
         data[index].update({'end_date': test.end_date.strftime("%A,%b %d, %Y. %I:%M %p")})
   return data