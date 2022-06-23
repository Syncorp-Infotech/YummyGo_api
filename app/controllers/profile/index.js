const { send_response, uniqueId } 	= require('../../utils/app.util');
const { verifyToken } 				= require('../../utils/jwt.util');
const { uploadFile } 				= require('../../utils/s3.util');
const { sendEmail } 				= require('../../utils/mail.util');
const db 							= require("../../models");
const authConfig 					= require('../../configs/auth.config');
const fs 							= require('fs');
const User 							= db.user;
const Role 							= db.role;
const Profile 						= db.profile;
const Video 						= db.video;

exports.viewProfile = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Profile.findOne({
            include: [{
                model: Role,
                attributes: ['role_id', 'role_name'],
                required: true
            }, {
                model: User,
                attributes: ['user_id', 'user_login']
            }],
            where: {
                profile_id: event.pathParams.profile_id
            }
        }).then(profile => {
            context.done(null, send_response(200, profile));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.viewProfile_view = function (event, context) {
    console.log("uuuuuu",event.pathParams.profile_id);    
    Profile.findOne({
            include: [{
                model: Role,
                attributes: ['role_id', 'role_name'],
                required: true
            }, {
                model: User,
                attributes: ['user_id', 'user_login']
            }],
            where: {
                profile_id: event.pathParams.profile_id
            }
        }).then(profile => {
            context.done(null, send_response(200, profile));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}

exports.checkmobile = function (event, context) {
        Profile.findOne({
            where: {
                profile_contact: event.pathParams.profile_contact
            }
        }).then(profile => {
            context.done(null, send_response(200, profile));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}



exports.statelist = function (event, context) {
    Profile.findAndCountAll({
        where: {
            country: event.pathParams.profile_contact
        }
    }).then(profile => {
        context.done(null, send_response(200, profile));
    }).catch(err => {
        context.done(null, send_response(500, { message: err.message }));
    });
}


exports.fetch_profile_detail = function (event, context) {
    Profile.findAndCountAll({
        where: {
            profile_id: event.pathParams.profile_id
        }
    }).then(profile => {
        context.done(null, send_response(200, profile));
    }).catch(err => {
        context.done(null, send_response(500, { message: err.message }));
    });
}


exports.updateProfile = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Profile.update({
			profile_first_name	: _data.first_name,
			profile_last_name	: _data.last_name,
			profile_email		: _data.email,
			profile_contact		: _data.contactno,
            updated_by			: auther
        }, 
		{
            where: {
                profile_id: event.pathParams.profile_id
            }
        }).then(profile => {
			var _otp = uniqueId(4);
			User.update({
				user_otp		: _otp,
			}, 
			{
				where: {
					profile_id: event.pathParams.profile_id
				}
			}).then(user => {
			//send email
				var _msghtml = fs.readFileSync('./app/templates/emailverificationotp.html', 'utf8');
				const message = {
					from: authConfig.smtp.sender,
					to: user.user_login,
					subject: 'Foodie Email Verification',
					html: _msghtml.replace("@FoodieUser", profile.profile_first_name).replace("@Email", user.user_login).replace("@CODEHERE", _otp)
				};
				sendEmail(message);
				context.done(null, send_response(200, { message: 'Profile updated successfully' }));
			});
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.uploadProfileImg = function (event, context) {
    const file = event.files.profileimg;
    verifyToken(event.headers).then(auther => {
        uploadFile(file, 'profileimgs').then((fileurl) => {
            Profile.update({
                profile_img: fileurl,
                updated_by: auther
            }, {
                where: {
                    profile_id: event.pathParams.profile_id
                }
            }).then(profile => {
				Profile.findOne({
					where: {
						profile_id: event.pathParams.profile_id
					}
				}).then(profileInfo => {
					context.done(null, send_response(200, profileInfo));
				});
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.uploadMenucard = function (event, context) {
    const file = event.files.menucard;

    verifyToken(event.headers).then(auther => {
        uploadFile(file, 'menucards').then((fileurl) => {
            
            Profile.update({
                profile_doc_menu: fileurl,
                updated_by: auther
            }, {
                where: {
                    profile_id: event.pathParams.profile_id
                }
            }).then(profile => {
                context.done(null, send_response(200, { message: 'Menucard uploaded successfully' }));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}





exports.uploadidprofileoneImg = function (event, context) {
    const file = event.files.profileimg;
        uploadFile(file, 'profileimgs').then((fileurl) => {
        context.done(null, send_response(200, { message: 'Profile image uploaded successfully',url : fileurl }));
        }).catch(err => {
            console.log(err);
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })   
}

exports.uploadidprofiletwoImg = function (event, context) {
    const file = event.files.profileimg;
        uploadFile(file, 'profileimgs').then((fileurl) => {
            Profile.update({
                idprofiletwo: fileurl
            }, {
                where: {
                    profile_id: event.pathParams.profile_id
                }
            }).then(profile => {
                context.done(null, send_response(200, { message: 'Profile image uploaded successfully' }));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}

exports.uploadidprofilethreeImg = function (event, context) {
    // const file = event.files.profileimg;
            var _data = event.body;
            console.log(_data);
            console.log(new Date());
            Video.create({
                profile_id: _data.user_id,
                video_link: _data.filepath,
                video_type: _data.type,
                video_note: _data.note,
                video_status: 'A',
            }).then(video => {
                context.done(null, send_response(200, video));
            }).catch(err => {
                console.log(err);
                context.done(null, send_response(500, { message: err.message }));
            });
}













