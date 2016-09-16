from app import app
import requests
import json

@app.route("/api_usa_gov_metadata",methods=["GET","POST"])
def api_usa_gov_metadata():
    r = requests.get("https://www.usa.gov/api/USAGovAPI/contacts.json/contacts")
    list_of_agencies = json.loads(r.text)["Contact"]
    keys_we_care_about = ["Id","Name","Description","Email"]
    agencies_we_care_about = []
    for agency in list_of_agencies:
        if not all([key in list(agency.keys()) for key in keys_we_care_about]): continue
        if all([bool(agency[key]) for key in keys_we_care_about]):
            if "(" in agency['Name'] and ")" in agency["Name"]:
                agencies_we_care_about.append({key:agency[key] for key in keys_we_care_about})
    #Database connection goes here
    return json.dumps(agencies_we_care_about)

