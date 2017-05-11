function initParams() {
	var obj ={}
		//obj.loginName = $('#loginName').val();
	
		if( isLoginName( $('#loginName').val() ) ){
			obj.loginName = $('#loginName').val();
		}else{
			alert('请填写正确的用户名');
		}
		obj.userName = $('userName').val();
		obj.familyPhone = $('familyPhone').val();
		obj.sex = $('sex').val();
		obj.birthday = $('birthday').val();
		obj.officePhone = $('officePhone').val();
		obj.mobilePhone = $('mobilePhone').val();
		obj.idCard = $('idCard').val();
		obj.familyAddress = $('familyAddress').val();
		
		//obj.mail = $('mail').val();
		if($('mail').val() == ''){
			obj.mail = '';
		}else if( isMail( $('mail').val() ) ){
			obj.mail = $('mail').val();
		}else{
			alert('邮箱格式不正确');
		}
		$('mail').val()===''?(obj.mail = ''):isMail( $('mail').val())===true?obj.mail = $('mail').val():alert('邮箱格式不正确');
		
		obj.qq = $('qq').val();
		obj.otherSocialMedia = $('otherSocialMedia').val();
		obj.degree = $('degree').val();
		obj.graduateSchool = $('graduateSchool').val();
		obj.speciality = $('speciality').val();
		obj.description = $('description').val();
		console.log(obj);
	return obj;
}


var englishName = data[i].englishName === null?'':data[i].englishName,
	mail = data[i].mail === null?'':data[i].mail,
	mobilePhone = data[i].mobilePhone === null?'':data[i].mobilePhone;
tr += '<tr><td><input type="checkbox"></td><td>' +
                                data[i].loginName+'</td><td>' +
                                data[i].userName+'</td><td>' +
                                englishName+'</td><td>' +
                                mail+'</td><td>' +
                                mobilePhone+'</td><td><span class="text-green">激活</span></td></tr>'
                                
                                
                                
                                
                                