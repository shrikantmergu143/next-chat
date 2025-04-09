const friendPayload = (formData) =>{
    const payload:any = {};
    if(formData?.friend_id){
        payload.friend_id = formData?.friend_id;
    }
    if(formData?.email_to){
        payload.email_to = formData?.email_to;
    }
    if(formData?.email_from){
        payload.email_from = formData?.email_from;
    }
    if(formData?.accepted_to){
        payload.accepted_to = formData?.accepted_to;
    }
    if(formData?.accepted_from){
        payload.accepted_from = formData?.accepted_from;
    }
    if(formData?.created_at){
        payload.created_at = formData?.created_at;
    }
    if(formData?.updated_at){
        payload.updated_at = formData?.updated_at;
    }
    if(formData?.status){
        payload.status = formData?.status;
    }
    if(formData?.active){
        payload.active = formData?.active;
    }
    if(formData?.is_deleted){
        payload.is_deleted = formData?.is_deleted;
    }
    if(formData?.last_message){
        payload.last_message = formData?.last_message;
    }
    return payload;
}
export default friendPayload;