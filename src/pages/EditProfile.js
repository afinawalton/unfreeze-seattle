import React, { useState, useEffect, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { UserContext } from '../hooks/UserContext';
const axios = require('axios');

const EditProfile = () => {
    const { user } = useContext(UserContext);
    const { editProfile } = useAuth();
    const profile = user.user_profile;
    
    const [interests, setInterests] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);

    // Get list of interests from database and add to state
    useEffect(() => {
        const controller = new AbortController();

        axios.get('http://localhost:8080/api/interests', { withCredentials: true })
        .then(res => {
            setInterests(res.data);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Successfully aborted');
            }
            console.log(err);
        });
        return () => {
            controller.abort();
        };
    }, [])

    // Get list of neighborhoods from database and add to state
    useEffect(() => {
        const controller = new AbortController();

        axios.get('http://localhost:8080/api/neighborhoods', { withCredentials: true })
        .then(res => {
            let neighborhoodList = res.data;
            neighborhoodList.sort();
            setNeighborhoods(neighborhoodList);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Successfully aborted');
            }
            console.log(err);
        });
        return () => {
            controller.abort();
        };
    }, [])

    const emptyProfile = {
        first_name: profile ? profile.first_name : '',
        pronouns: profile ? profile.pronouns : '',
        work: profile ? profile.work : '',
        neighborhood: profile ? profile.neighborhood : '',
        top_interest: profile ? profile.top_interest : '',
        blurb: profile? profile.blurb : '',
        other_interests: profile ? profile.other_interests : [],
        bio: profile ? profile.bio : '',
        prompt_answers: {
            'prompt 1': profile ? profile.prompt_answers['prompt 1'] : '',
            'prompt 2': profile ? profile.prompt_answers['prompt 2'] : ''
        }
    }

    const [formFields, setFormFields] = useState(emptyProfile);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'other_interests') {
            const options = e.target.options;
            let selectedInterests = [];
            for (let option of options) {
                if (option.selected) {
                    selectedInterests.push(option.value);
                }
            }
            setFormFields({
                ...formFields,
                other_interests: selectedInterests
            });
        } else if (name === 'prompt 1') {
            setFormFields({
                ...formFields,
                prompt_answers: {
                    [name]: value,
                    "prompt 2": formFields['prompt_answers']['prompt 2']
                }
            });
        } else if (name === 'prompt 2') {
            setFormFields({
                ...formFields,
                prompt_answers: {
                    [name]: value,
                    "prompt 1": formFields['prompt_answers']['prompt 1']
                }
            });
        }
        else {
            setFormFields({
                ...formFields,
                [name]: value,
            });
        }
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        console.log('Data being submitted: ', formFields);

        editProfile(formFields);
        
        setFormFields(emptyProfile);
    }

    return (
        <main>
            <header id='logo'>
                <h1>Unfreeze Seattle</h1>
            </header>
            <form id='editProfileForm' onSubmit={onFormSubmit}>
                <h2 id='editProfileTitle'>Edit My Profile</h2>
                <p>
                    <label htmlFor='first_name'>First name</label>
                    <input type='text' id='firstName' name='first_name' onChange={handleInputChange} value={formFields.first_name} ></input>
                </p>
                {/* <p>
                    <label htmlFor='profile_pic'>Profile Picture</label>
                    <input type='file' id='profilePic' name='profile_pic' value={formFields.profile_pic} accept='image/png image/jpg image/jpeg' ></input>
                </p> */}
                <p>
                    <label htmlFor='pronouns'>Pronouns</label>
                    <input type="text" name="pronouns" onChange={handleInputChange} value={formFields.pronouns}></input>
                </p>
                <p>
                    <label htmlFor='work'>Work</label>
                    <input type="text" name="work" onChange={handleInputChange} value={formFields.work}></input>
                </p>
                <p>
                    <label htmlFor='neighborhood'>Neighborhood</label>
                    <select id='neighborhoodList' name='neighborhood' onChange={handleInputChange} value={formFields.neighborhood} >
                        <option value=''>Choose your closest neighborhood</option>
                        {neighborhoods.map(pair => 
                            <option key={pair['id']} value={pair['name']}>{pair['name']}</option>
                        )}
                    </select>
                </p>
                <p>
                    <label htmlFor='top_interest'>Top Interest</label>
                    <select id='top_interest' name='top_interest' onChange={handleInputChange} value={formFields.top_interest} >
                        <option value=''>Choose your primary interest</option>
                        {interests.map(pair => 
                            <option key={pair['id']} value={pair['name']}>{pair['name']}</option>
                        )}
                    </select>
                </p>
                <p>
                    <label htmlFor='blurb'>Blurb</label>
                    <input type="text" name="blurb" onChange={handleInputChange} value={formFields.blurb}></input>
                </p>
                <p>
                    <label htmlFor='other_interests'>Choose other interests</label>
                    <select type='text' id='interests' name='other_interests' onChange={handleInputChange} multiple >
                    {interests.map(pair => 
                            <option key={pair['id']} value={pair['name']}>{pair['name']}</option>
                        )}
                    </select>
                </p>
                <p>
                    <label htmlFor='bio'>Bio</label>
                    <input type="text" name="bio" onChange={handleInputChange} value={formFields.bio}></input>
                </p>
                    {user['resident_type'] === 'transplant' ?
                    <p>
                        <label htmlFor='prompt1'>Why did you move to Seattle?</label>
                        <input id='prompt1' name='prompt 1' value={formFields.prompt_answers['prompt 1']} onChange={handleInputChange} type='text'></input>
                        
                        <label htmlFor='prompt2'>What are you most excited to explore in Seattle?</label>
                        <input id='prompt2' name='prompt 2' value={formFields.prompt_answers['prompt 2']} onChange={handleInputChange} type='text'></input>
                    </p>
                    : user['resident_type'] === 'local' ?
                    <p>
                        <label htmlFor='prompt1'>What's your favorite thing about Seattle?</label>
                        <input id='prompt1' name='prompt 1' value={formFields.prompt_answers['prompt 1']} onChange={handleInputChange} type='text'></input>
                        
                        <label htmlFor='prompt2'>What makes you stay here?</label>
                        <input id='prompt2' name='prompt 2' value={formFields.prompt_answers['prompt 2']} onChange={handleInputChange} type='text'></input>
                    </p>
                    : null
                    }
                <p>
                    <button type='submit' id='saveChangesButton'>Save Changes</button>
                </p>
            </form>
            <p>Want to delete your account?</p>
            <a href='/delete-account'>Delete Account</a>
            <p>You will be taken to another page to confirm your account deletion.</p>
        </main>
    )
}

export default EditProfile;