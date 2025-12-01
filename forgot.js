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


    let currentStep = 1;

    function showStep(n){
        steps.forEach((step,index)=>{
            step.classList.toggle =(index+1 === n)
        });
        currentStep = n;
    }

    //step 1 check if the username exists
    findUsernameBtn.addEventListener('click',async()=>{
        const username = usernameInput.value.trim();

        if(!username){
            alert("Please enter your username");
        }
        //connect to backend
        // try{
        //     await fetch('',{
        //     method:'POST',
        //     header:{ 'Content-Type':'application/json' },
        //     body:JSON.stringify({username})
        // });
        // }catch(error){
        //     console.error("Error finding username");
        //     alert("This username doesnot exist");
        // }
        console.log("Button Clicked");
        alert("Accound Found! Proceeding to next step")
        showStep(2);
    });

    //step 2 verification code
    sendCodeBtn.addEventListener('click',async()=>{
        alert("Verification code sent successfully")
        try{
            const response = await fetch('',{
                method:'POST',
                header:{ 'Content-Type':'appication/json' },
                body:JSON.stringify({code})
            });
        }catch(error){
            console.error("Error in sending code");
            alert("Failed to send verification code");
        }
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
    // forgotForm.addEventListener('submit',(e)=>{
    //     e.preventDefault();

    //     const p1 = newPassInput.value.trim();
    //     const p2 = confirmPassInput.value.trim();

        
    // });

});