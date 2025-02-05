import { useState } from 'react'
import './App.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

function App() {
  const [formData, setFormData] = useState({ firstname: "", lastname: "", gender: "", dob: null, phoneNumber: "", email: "", password: "", confirmPassword: "" })
  const [isinvalidfirstname, setInvalidFirstName] = useState(false)
  const [isinvalidsecondname, setInvalidSecondName] = useState(false)
  const [isinvalidphonenumber, setInvalidPhoneNumber] = useState(false)
  const [isinvalidemail, setInvalidEmail] = useState(false)
  const [isinvalidpassword, setInvalidPassword] = useState(false)
  const [ispasswordmismatch, setPasswordMismatch] = useState(false)


  const nameRegex = /^[A-Z][A-Za-z]*$/;
  const phRegex = /^[0-9]{1,10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // Password Regex: Minimum 8 characters, at least 1 special character, and 1 number
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const handleNames = (e) => {
    const { name, value } = e.target
    if ((nameRegex.test(value) && value.length <= 10) || value === "") {
      setFormData({ ...formData, [name]: value })
      if (name === "firstname") {
        setInvalidFirstName(false)
      } else if (name === "lastname") {
        setInvalidSecondName(false)
      }
    } else {
      setFormData({ ...formData, [name]: value })
      if (name === "firstname") {
        setInvalidFirstName(true)
      } else if (name === "lastname") {
        setInvalidSecondName(true)
      }
    }
  }
  const handlePhoneNumber = (e) => {
    const { value } = e.target
    setFormData({ ...formData, phoneNumber: value });
    if (phRegex.test(value) || value === "") {
      setInvalidPhoneNumber(false)
    } else {
      setInvalidPhoneNumber(true)
    }

  }
  const handleEmail = (e) => {
    const email = e.target.value
    setFormData({ ...formData, email: email });
    if (emailRegex.test(email) || email === "") {
      setInvalidEmail(false)
    } else {
      setInvalidEmail(true)
    }

  }
  const handlePassword = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "password") {
      setInvalidPassword(!passwordRegex.test(value))
      setPasswordMismatch(formData.confirmPassword !== value);
    } else if (name === "confirmPassword") {
      setPasswordMismatch(value !== formData.password)
    }

  }
  const handleDateofbirth = (newDate) => {
    if (newDate) {
      setFormData({ ...formData, dob: newDate.format("DD/MM/YYYY") });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!formData.gender || isinvalidfirstname || isinvalidsecondname || isinvalidphonenumber || isinvalidemail || isinvalidpassword || ispasswordmismatch) {
      alert("Please fix all errors before submitting.");
      return;
    }
    alert("Form submitted Successfully");
  }
  // submit button disabled condition
  const isFormValid =
    formData.firstname.trim() !== "" &&
    formData.lastname.trim() !== "" &&
    formData.gender &&
    formData.dob !== null &&
    formData.phoneNumber.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    !isinvalidfirstname &&
    !isinvalidsecondname &&
    !isinvalidphonenumber &&
    !isinvalidemail &&
    !isinvalidpassword &&
    !ispasswordmismatch;
  return (
    <>

      <div className=' d-flex flex-column align-items-center justify-content-center border bg-warning p-5 w-100'  >
        <h3 className='text-danger  '>Registration Form</h3>
        <div className='container w-100' style={{ maxWidth: '400px' }}>

          <form onSubmit={handleSubmit}>
            <label className='form-label' htmlFor="">First Name:</label>
            <input onChange={handleNames} name='firstname' value={formData.firstname} type="text" className='form-control' placeholder='first name' />
            {
              isinvalidfirstname &&
              <p className='text-danger mb-0'>first letter should be capital</p>

            }

            <label className='form-label' htmlFor="">Last Name:</label>
            <input onChange={handleNames} name='lastname' value={formData.lastname} type="text" className='form-control' placeholder='last name' />
            {
              isinvalidsecondname &&
              <p className='text-danger mb-0'>first letter should be capital</p>

            }

            {/* Gender */}

            <label className='text-black me-3 mb-2 mt-3'>Gender:</label>

            <input onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))} checked={formData.gender === "Male"} type="radio" id="male" name="gender" value="Male" />
            <label className='text-black me-4 ms-2' htmlFor="male">Male</label>

            <input onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))} checked={formData.gender === "Female"} type="radio" id="female" name="gender" value="Female" />
            <label className='text-black me-4 ms-2' htmlFor="female">Female</label>

            <input onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))} checked={formData.gender === "Other"} type="radio" id="other" name="gender" value="Other" />
            <label className='text-black me-4 ms-2' htmlFor="other">Other</label><br />
            {
              !formData.gender &&
              <p className='text-danger mb-0'>please select a gender</p>
            }
            {/* Date of Birth */}
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer components={["DatePicker"]} >
                <DemoItem label="Date of Birth" >
                  <DatePicker className="form-control bg-light"
                    onChange={handleDateofbirth}
                    value={formData.dob ? dayjs(formData.dob, "DD/MM/YYYY") : null}
                    format="DD/MM/YYYY"
                    disableFuture
                    views={['year', 'month', 'day']}
                    minDate={dayjs().subtract(100, "year")}
                    maxDate={dayjs().subtract(18, "year")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          "& .MuiInputBase-root": {
                            height: "40px", // Adjust height here
                            fontSize: "14px",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "10px", // Adjust inner padding
                          },
                        },
                      },
                    }}
                  />
                </DemoItem>
              </DemoContainer>

            </LocalizationProvider>



            <label className='form-label' htmlFor="">Phone Number:</label>
            <input onChange={handlePhoneNumber} value={formData.phoneNumber || ""} type="text" className={`form-control ${isinvalidphonenumber ? "is-invalid" : ""}`} placeholder='phone number' />
            {
              isinvalidphonenumber &&
              <p className='text-danger mb-0'>invalid phone number</p>
            }
            <label className='form-label' htmlFor="">Email:</label>
            <input onChange={handleEmail} value={formData.email || ""} type="email" className='form-control' placeholder='email' />
            {
              isinvalidemail &&
              <p className='text-danger mb-0'>invalid email</p>
            }

            <label className='form-label' htmlFor="">Password:</label>
            <input onChange={handlePassword} name='password' type="password" className={`form-control ${isinvalidpassword ? "is-invalid" : ""}`} placeholder='password' />
            {
              isinvalidpassword &&
              <p className='text-danger mb-0'>password must be min 8 char 1 no. & 1 special char</p>
            }
            <label className='form-label' htmlFor="">Confirm Password:</label>
            <input onChange={handlePassword} name='confirmPassword' type="password" className={`form-control ${ispasswordmismatch ? "is-invalid" : ""}`} placeholder='confirm password' />
            {
              ispasswordmismatch &&
              <p className='text-danger mb-0'>password does not match</p>
            }
            <button type='submit' className='btn btn-primary mt-3 w-100' disabled={!isFormValid}>Register</button>
          </form>
        </div>
      </div >




    </>
  )
}

export default App
