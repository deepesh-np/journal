/** @format */
import React from 'react';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'user',
      profile: {
        headline: '',
        currentPosition: '',
        skills: [''],
        goals: [''],
        resume: '',
      },
    },
    mode: 'onSubmit',
  });

  const { fields: skillFields, append: addSkill } = useFieldArray({
    control,
    name: 'profile.skills',
  });

  const { fields: goalFields, append: addGoal } = useFieldArray({
    control,
    name: 'profile.goals',
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3002/auth/signup', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Saved:', res.data);
      navigate('/');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className='container mt-5'>
      {/* Error alert */}
      {error && (
        <div className='alert alert-warning' role='alert'>
          {error}
        </div>
      )}
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='card shadow p-4 text-start needs-validation'
              noValidate>
              <h3 className='text-center mb-4 fw-bold'>Signup</h3>

              {/* Username */}
              <div className='mb-3'>
                <label htmlFor='name' className='form-label fw-light'>
                  Username
                </label>
                <input
                  id='name'
                  {...register('name', { required: true })}
                  placeholder='Full Name'
                  className={`form-control ${
                    isSubmitted ? (errors.name ? 'is-invalid' : 'is-valid') : ''
                  }`}
                />
                <div className='valid-feedback'>Looks good!</div>
                <div className='invalid-feedback'>Not Valid Username</div>
              </div>

              {/* Email */}
              <div className='mb-3'>
                <label htmlFor='email' className='form-label fw-light'>
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  {...register('email', { required: true })}
                  placeholder='Email'
                  className={`form-control ${
                    isSubmitted
                      ? errors.email
                        ? 'is-invalid'
                        : 'is-valid'
                      : ''
                  }`}
                />
                <div className='valid-feedback'>Looks good!</div>
                <div className='invalid-feedback'>Not Valid Email</div>
              </div>

              {/* Password */}
              <div className='mb-3'>
                <label htmlFor='password' className='form-label fw-light'>
                  Password
                </label>
                <input
                  id='password'
                  type='password'
                  {...register('password', { required: true })}
                  placeholder='Password'
                  className={`form-control ${
                    isSubmitted
                      ? errors.password
                        ? 'is-invalid'
                        : 'is-valid'
                      : ''
                  }`}
                />
                <div className='valid-feedback'>Looks good!</div>
                <div className='invalid-feedback'>Not Valid Password</div>
              </div>

              {/* Profile Headline */}
              <div className='mb-3'>
                <label htmlFor='headline' className='form-label fw-light'>
                  Profile Headline
                </label>
                <input
                  id='headline'
                  {...register('profile.headline', { required: true })}
                  placeholder='Profile Headline'
                  className={`form-control ${
                    isSubmitted
                      ? errors.profile?.headline
                        ? 'is-invalid'
                        : 'is-valid'
                      : ''
                  }`}
                />
                <div className='valid-feedback'>Looks good!</div>
                <div className='invalid-feedback'>Not Valid Headline</div>
              </div>

              {/* Current Position */}
              <div className='mb-3'>
                <label
                  htmlFor='currentPosition'
                  className='form-label fw-light'>
                  Current Position
                </label>
                <input
                  id='currentPosition'
                  {...register('profile.currentPosition', { required: true })}
                  placeholder='Current Position'
                  className={`form-control ${
                    isSubmitted
                      ? errors.profile?.currentPosition
                        ? 'is-invalid'
                        : 'is-valid'
                      : ''
                  }`}
                />
                <div className='valid-feedback'>Looks good!</div>
                <div className='invalid-feedback'>Not Valid Position</div>
              </div>

              {/* Skills */}
              <div className='mb-3'>
                <label className='form-label fw-bold'>Skills</label>
                {skillFields.map((field, index) => (
                  <div key={field.id} className='mb-2'>
                    <input
                      {...register(`profile.skills.${index}`, {
                        required: true,
                      })}
                      placeholder={`Skill ${index + 1}`}
                      className={`form-control ${
                        isSubmitted
                          ? errors.profile?.skills?.[index]
                            ? 'is-invalid'
                            : 'is-valid'
                          : ''
                      }`}
                    />
                    <div className='valid-feedback'>Looks good!</div>
                    <div className='invalid-feedback'>Not Valid Skill</div>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addSkill('')}
                  className='btn btn-outline-secondary btn-sm'>
                  + Add Skill
                </button>
              </div>

              {/* Goals */}
              <div className='mb-3'>
                <label className='form-label fw-bold'>Goals</label>
                {goalFields.map((field, index) => (
                  <div key={field.id} className='mb-2'>
                    <input
                      {...register(`profile.goals.${index}`, {
                        required: true,
                      })}
                      placeholder={`Goal ${index + 1}`}
                      className={`form-control ${
                        isSubmitted
                          ? errors.profile?.goals?.[index]
                            ? 'is-invalid'
                            : 'is-valid'
                          : ''
                      }`}
                    />
                    <div className='valid-feedback'>Looks good!</div>
                    <div className='invalid-feedback'>Not Valid Goal</div>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addGoal('')}
                  className='btn btn-outline-secondary btn-sm fw-bold'>
                  + Add Goal
                </button>
              </div>

              <button type='submit' className='btn btn-primary w-100 mb-4'>
                Save User
              </button>
              <span className='text-center'>
                <strong>
                  {' '}
                  Already have an account? <Link to='/login'>Login</Link>{' '}
                </strong>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
