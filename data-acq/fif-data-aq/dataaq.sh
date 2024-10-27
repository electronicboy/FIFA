#!/usr/bin/env bash


apiKey=""

query="culture" # query is required, I would maybe run this script a few times with different queries URL ENCODED!
# Get these from google, right click on the map and it will show the long, lat in the window
lat=53.424275099999996 # lat is required
long=-2.9348303 # long is required
limit=40 # limit is optional, default is 20

curl --request GET \
	--url "https://local-business-data.p.rapidapi.com/search-in-area?query=$query&lat=$lat&lng=$long&zoom=13&limit=$limit&language=en&region=gb&extract_emails_and_contacts=false" \
	--header 'x-rapidapi-host: local-business-data.p.rapidapi.com' \
	--header "x-rapidapi-key: $apiKey" | tee "rundir/input/$(date +%s).json"