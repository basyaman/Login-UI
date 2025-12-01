document.addEventListener('DOMContentLoaded', ()=>{
    const forgotForm = document.getElementById('forgot-form');
    const steps = document.querySelectorAll('.step');

    const findUsernameBtn = document.getElementById('find-username');
    const sendCodeBtn = document.getElementById('link-btn');
    const verifyCodeBtn = document.getElementById('verify-code');
    const yesBtn = document.getElementById('change-password-yes');
    const noBtn = document.getElementById('change-password-no');

    const usernameInput = document.getElementById('username');
    const otpInputs = document.querySelectorAll('.otp-input');
    const hiddenOtpInput = document.getElementById('verification-code');
    const newPassInput = document.getElementById('new-password');
    const confirmPassInput = document.getElementById('confirm-password');
    const confrimPassBtn = document.getElementById('change-pass');

    const passwordFields = document.querySelectorAll('.pass');
    const eyeClose = document.querySelector('.eye-icon.closed');
    const eyeOpen = document.querySelector('.eye-icon.open');

    
    eyeClose.addEventListener('click', ()=>{
       passwordFields.forEach(field=>{
            field.type='text';
       });
       eyeClose.classList.remove('active');
       eyeOpen.classList.add('active');
    });
    eyeOpen.addEventListener('click', ()=>{
        passwordFields.forEach(field=>{
            field.type='password';
        });
        eyeClose.classList.add('active')
        eyeOpen.classList.remove('active');
    });


    let currentStep = 1;

    const STEP_MESSAGES = {
        1: "Recover Your Account",
        2: "Verification",
        3: "Change Password ?",
        4: "Create Password"
    };

    function showStep(n){
        steps.forEach((step, index)=>{
            const isCurrent = index + 1 === n;
            step.style.display = isCurrent ? 'block' : 'none';
        });
        currentStep = n;
        updateWelcomeMsg(n);
    }
    function updateWelcomeMsg(step){
        const heroHeading = document.querySelector('.hero-title h2');
        if(heroHeading && STEP_MESSAGES[step]){
            heroHeading.textContent = STEP_MESSAGES[step];
        }
    }
    showStep(1);

    //step 1 check if the username exists
    findUsernameBtn.addEventListener('click',async()=>{
        const username = usernameInput.value.trim();

        if(!username){
            alert("Please enter your username");
            return;
        }
        //connect to backend
        try{
            await fetch('',{
            method:'POST',
            header:{ 'Content-Type':'application/json' },
            body:JSON.stringify({username})
        });
        }catch(error){
            console.error("Error finding username");
            alert("This username doesnot exist");
        }
        console.log("Button Clicked");
        alert("Accound Found! Proceeding to next step")
        showStep(2);
    });

    //step 2 verification code
    sendCodeBtn.addEventListener('click',async()=>{
        try{
            const response = await fetch('',{
                method:'POST',
                header:{ 'Content-Type':'appication/json' },
                body:JSON.stringify({code})
            });
            if(!response.ok){
                alert("Verification Code Sent Successfully");
            }else{
                alert("Failed to send code")
            }
        }catch(error){
            console.error("Error in sending code");
            alert("Network error please check your internet");
        }
    });

    //otp behavaiour
    otpInputs.forEach((input, index) =>{
        input.addEventListener('input', ()=>{
            input.value = input.value.replace(/[^0-9]/g, '');
            if(input.value && index<otpInputs.length -1){
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) =>{
            if(e.key === 'Backspace' && !input.value && index>0){
                otpInputs[index - 1].focus();
            }
        });
    });

    //after clicking on verify code 
    verifyCodeBtn.addEventListener('click',async()=>{
        const code = Array.from(otpInputs).map(input => input.value.trim()).join('');

        if(code.length !== otpInputs.length){
            alert("Please enter full code");
            return;
        }
        console.log("Final OTP ", code);

        try{
            const response = await fetch ('',{
                method:'POST',
                header:{ 'Content-Type':'application/json' },
                body:JSON.stringify({username:usernameInput.value.trim(),code})
            });
        }catch(error){
            console.error("Error verifying code");
            alert("Failed to verify code");
        }
        alert("Verification Successfull")
        showStep(3);
        
    });

    //step 3 for yes no 
    //if user chooses yes
    yesBtn.addEventListener('click', ()=>{
        showStep(4)
    })
    //if user chooses no 
    noBtn.addEventListener('click', ()=>{
        window.location.href = "index.html";
    })

    //step4
    forgotForm.addEventListener('submit', async (e)=>{
        e.preventDefault();

        const username = usernameInput.value.trim();
        const p1 = newPassInput.value.trim();
        const p2 = confirmPassInput.value.trim();

        const passwordRegex = /^[a-zA-Z\s]{2,50}$/;

        if(!p1 || !p2){
            alert("Please fill out both password fields")
            return;
        }
        if(!passwordRegex.test(p1)){
            alert("password must have a uppercase number and a speacial character");
            return;
        }

        if(p1 !== p2){
            alert("Please enter the same password");
            return;
        }

        try{
            const response = await fetch('',{
                method: 'POST',
                header: {'Content-Type' : 'applicatoin/json'},
                body: JSON.stringify({username, password:newPass})
            });

            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if(!data.success){
                alert(data.message || 'Faileds to change the password');
                return;
                
            }
            alert("Password changed successfully");
                window.location.href = "index.html"; //back to login page
            

        }catch(error){
            console.error("Error changing password: ", error);
            alert("Something went wrong while changing password please try again later");
        }

        
    });

    

});