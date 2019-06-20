/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import InputText from '../components/inputText';
import Select from '../components/select';

const courseSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  watchHref: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  authorId: Yup.string().required('Required'),
  length: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
});

class about extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      location: {
        state: { authors },
      },
    } = props;

    const data = authors.map(x => ({ value: x.id, text: `${x.firstName} ${x.lastName}` }));

    this.state = {
      formInput: [
        {
          name: 'title',
          component: InputText,
          placeholder: 'Title',
        },
        {
          name: 'watchHref',
          component: InputText,
        },
        {
          name: 'authorId',
          component: Select,
          data,
          placeholder: 'Select Author',
        },
        {
          name: 'length',
          component: InputText,
        },
        {
          name: 'category',
          component: InputText,
        },
      ],
    };
  }

  submit = async (values, actions) => {
    try {
      if (values.id) {
        await fetch(`http://localhost:3004/courses/${values.id}`, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      } else {
        await fetch('http://localhost:3004/courses', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      }
      actions.resetForm();
      const { history } = this.props;
      history.goBack();
    } catch (error) {
      actions.setErrors({ general: 'Oops Something went wrong!!' });
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    const {
      location: {
        state: { course },
      },
    } = this.props;
    const { formInput } = this.state;
    return (
      <div>
        <Formik initialValues={course} validationSchema={courseSchema} onSubmit={this.submit}>
          {({ handleSubmit, errors, isSubmitting }) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h1>{course.id ? 'Edit Form' : 'Add Form'}</h1>
                {errors.general && <p>{errors.general}</p>}
                {formInput.map((x, i) => (
                  <Field key={i} {...x} />
                ))}
                <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting
                    ? `${course.id ? 'Editing Course....' : 'Adding Course....'}`
                    : `${course.id ? 'Edit Course' : 'Add Course'}`}
                </button>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default about;
