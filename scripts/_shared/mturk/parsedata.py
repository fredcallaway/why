import sys
import json
import csv

input_file = sys.argv[1]
output_file = sys.argv[2]

workers = {}
def symb(workerid):
  if workerid in workers:
    return workers[workerid]
  else:
    id_number = str(len(workers))
    workers[workerid] = id_number
    return id_number

trial_cols = set()
check_trial_cols = set()
condition_cols = set()
subject_information_cols = set()
system_cols = set()
other_cols = set()

line_num = 0
mturk_header = []
with open(input_file, 'rb') as csvfile:
  csvreader = csv.reader(csvfile, delimiter='\t', quotechar='"')
  for row in csvreader:
    if line_num == 0:
      mturk_header = row
      line_num += 1
    else:
      for i in range(len(row)):
        elem = row[i]
        mturk_label = mturk_header[i]
        if mturk_label[:7] == "Answer.":
          label = mturk_label[7:]
          if label == "trials":
            elem = json.loads('{"dummy_name":' + elem + '}')["dummy_name"]
            for trial in elem:
              trial_cols.update(trial.keys())
          elif label == "check_trials":
            elem = json.loads('{"dummy_name":' + elem + '}')["dummy_name"]
            for check_trial in elem:
              check_trial_cols.update(check_trial.keys())
          elif label == "condition":
            elem = json.loads(elem)
            condition_cols.update(elem.keys())
          elif label == "subject_information":
            elem = json.loads(elem)
            subject_information_cols.update(elem.keys())
          elif label == "system":
            elem = json.loads(elem)
            system_cols.update(elem.keys())
          else:
            other_cols.add(label)
        elif mturk_label == "workerid":
          do_nothing = true
          # elem = symb(elem)
          # for cols in [trial_cols, check_trial_cols, condition_cols, subject_information_cols, system_cols, other_cols]:
          #   cols.add(mturk_label)
        else:
          other_cols.add(mturk_label)

line_num = 0
mturk_header = []
with open(input_file, 'rb') as csvfile:
  csvreader = csv.reader(csvfile, delimiter='\t', quotechar='"')
  for row in csvreader:
    if line_num == 0:
      mturk_header = row
      line_num += 1
    else:
      trials_rows = {}
      for key in trial_cols:
        trials_rows[key] = []
      check_trial_rows = {}
      for key in check_trial_cols:
        check_trial_rows[key] = []
      condition_row = []
      subject_information_row = []
      system_row = []
      other_row = []
      for i in range(len(row)):
        elem = row[i]
        mturk_label = mturk_header[i]
        if mturk_label[:7] == "Answer.":
          label = mturk_label[7:]
          if label == "trials":
            elem = json.loads('{"dummy_name":' + elem + '}')["dummy_name"]
            for trial in elem:
              for key in trial_cols:
                if key in trial.keys():
                  trials_rows[key].append(trial[key])
                else:
                  trials_rows[key].append("NA")
          elif label == "check_trials":
            elem = json.loads('{"dummy_name":' + elem + '}')["dummy_name"]
            for check_trial in elem:
              for key in check_trial_cols:
                if key in check_trial.keys():
                  check_trial_rows[key].append(check_trial[key])
                else:
                  check_trial_rows[key].append("NA")
          elif label == "condition":
            for key in elem:
              if key in elem.keys():
                condition_row.append(elem[key])
              else:
                condition_row.append("NA")
          elif label == "subject_information":
            for key in elem:
              if key in elem.keys():
                subject_information_row.append(elem[key])
              else:
                subject_information_row.append("NA")
          elif label == "system":
            for key in elem:
              if key in elem.keys():
                system_row.append(elem[key])
              else:
                system_row.append("NA")
          else:
            for key in elem:
              if key in elem.keys():
                other_row.append(elem[key])
        elif mturk_label == "workerid":
          elem = symb(elem)
          a=1
        else:
          for key in elem:
            if key in elem.keys():
              other_row.append(elem[key])

# class Table:
#   def __init__(self, header_elements=[], label=None):
#     self.header = set(header_elements)
#     self.data = {}
#     self.label = label
#     self.workerid = None
#   def update_header(self, header_elements):
#     if type(header_elements) is list:
#       self.header.update(header_elements)
#     else:
#       self.header.add(header_elements)

# trials = Table()
# check_trials = Table()
# condition = Table()
# subject_information = Table()
# system = Table()
# other = Table()

# #### first pass: get header labels for each table
# line_num = 0
# mturk_header = []
# with open(input_file, 'rb') as csvfile:
#   csvreader = csv.reader(csvfile, delimiter='\t', quotechar='"')
#   for row in csvreader:
#     if line_num == 0:
#       mturk_header = row
#       line_num += 1
#     else:
#       for i in range(len(row)):
#         elem = row[i]
#         mturk_label = mturk_header[i]
#         if mturk_label[:7] == "Answer.":
#           label = mturk_label[7:]
#           if label == "trials":
#             some_trials = json.loads('{"trials" :' + elem + "}")["trials"]
#             for a_trial in some_trials:
#               trials.update_header(a_trial.keys())
#           elif label == "check_trials":
#             some_check_trials = json.loads('{"check_trials" :' + elem + "}")["check_trials"]
#             for a_check_trial in some_check_trials:
#               check_trials.update_header(a_check_trial.keys())
#           elif label == "condition":
#             a_condition = json.loads(elem)
#           elif label == "subject_information":
#             a_subject = json.loads(elem)
#           elif label == "system":
#             a_system = json.loads(elem)
#           else:
#             other.update_header(label)
#         elif mturk_label == "workerid":
#           for table in [trials, check_trials, condition, subject_information, system, other]:
#             table.update_header(mturk_label)
#             table.workerid = symb(elem)
#         else:
#           other.update_header(mturk_label)

# #### second pass: get values
# line_num = 0
# mturk_header = []
# with open(input_file, 'rb') as csvfile:
#   csvreader = csv.reader(csvfile, delimiter='\t', quotechar='"')
#   for row in csvreader:
#     if line_num == 0:
#       mturk_header = row
#       line_num += 1
#     else:
#       for i in range(len(row)):
#         elem = row[i]
#         mturk_label = mturk_header[i]
#         if mturk_label[:7] == "Answer.":
#           label = mturk_label[7:]
#           if label == "trials":
#             print elem
#             some_trials = json.loads('{"trials" :' + elem + "}")["trials"]
#             for a_trial in some_trials:
#               trial_row = 
#               for key in trials.header:
#                 if key != "workerid":
#                   trials.data["workerid"].push
#               trials.update_header(a_trial.keys())
#           elif label == "check_trials":
#             some_check_trials = json.loads('{"check_trials" :' + elem + "}")["check_trials"]
#             for a_check_trial in some_check_trials:
#               check_trials.update_header(a_check_trial.keys())
#           elif label == "condition":
#             a_condition = json.loads(elem)
#           elif label == "subject_information":
#             a_subject = json.loads(elem)
#           elif label == "system":
#             a_system = json.loads(elem)
#           else:
#             other.update_header(label)
#         elif mturk_label == "workerid":
#           for table in [trials, check_trials, condition, subject_information, system, other]:
#             table.update_header(mturk_label)
#             table.data["workerid"] = symb(elem)
#         else:
#           other.update_header(mturk_label)

# print workers
# print
# print trials.data
# print trials.header

# # w = open(output_file, 'w')
# # w.write("\n".join(["\t".join(x) for x in output_lines]))
# # w.close()