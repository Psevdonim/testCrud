const url = process.env.VUE_APP_API_BACKEND_URL;


//reusable endpoints
const items = 'items/'


//endpoints
const links_data_groups = 'data_groups' 
const links_record_groups = 'record_groups' 

//links
const data_groups = (collection = '' ,id = '' )=> url + items + links_data_groups + collection + '/' + id;
const record_groups = (collection = '' ,id = '' )=> url + items + links_record_groups + collection + '/' + id;


export default {
	data_groups,
	record_groups
}

