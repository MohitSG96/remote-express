/**
 * Created by hywire on 08/07/21.
 */

 module.exports = {

	AUTH_TOKEN_EXPIRY_HOURS: 168, // 7 days

	OTP_CHANNELS: {
		PHONE: 'phone',
		EMAIL: 'email'
	},

	USER_PERMISSIONS: {
		MANAGE_USERS: 'manage_users'
	},

	USER_STATUS: {
		BLOCKED: -1,
		PENDING: 0,
		ACTIVE: 1
	},

	USERS_PAGINATION_PER_PAGE_LIMIT: 50,

	CLOUD_STORAGE_SIGNED_URL_EXPIRY: 30, // in minutes
	allowedAttachmentTypes: [
		'.jpg', '.jpeg', '.png', '.gif', '.webp', '.ico', '.bmp', '.doc', '.docx', '.xls', '.xlsx', '.pdf', '.ppt', '.pptx', '.txt',
	],
	allowedBookAttachments:[
		'.epub', '.tex', '.pdf', 'ico', '.jpg', '.jpeg', '.png', '.gif', '.bmp',
	],
	allowedVideoAttachments:[
		'.mp4', '.3gp', '.3gp', 'webm', '.mov', '.hd','.jpg' ,'.webp' ,'.png',
	],
	
};
