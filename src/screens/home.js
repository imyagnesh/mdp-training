import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
  };

  state = {
    course: {
      title: '',
      watchHref: '',
      authorId: '',
      length: '',
      category: '',
    },
  };

  constructor(props) {
    super(props);
    const { loadAuthors, loadCourses } = props;
    loadAuthors();
    loadCourses();
  }

  displayAuthor = id => {
    const { authors } = this.props;
    const author = authors.find(x => x.id === id);
    if (author) {
      return `${author.firstName} ${author.lastName}`;
    }
    return '';
  };

  addCourse = () => {
    const { history } = this.props;
    const { course, authors } = this.state;
    history.push({
      pathname: '/about',
      state: {
        course,
        authors,
      },
    });
  };

  editCourse = course => {
    const { history } = this.props;
    const { authors } = this.state;
    history.push({
      pathname: '/about',
      state: {
        course,
        authors,
      },
    });
  };

  deleteCourse = async course => {
    fetch(`http://localhost:3004/courses/${course.id}`, {
      method: 'DELETE',
    });
    this.setState(state => {
      return {
        courses: state.courses.filter(x => x.id !== course.id),
      };
    });
  };

  render() {
    const { loading, courses, error } = this.props;
    if (loading) {
      return <h1>Loading....</h1>;
    }
    if (error) {
      return <h1>Oops! Something went wrong</h1>;
    }
    return (
      <div>
        <button type="button" onClick={this.addCourse}>
          Add Course
        </button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Author</th>
              <th>Length</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>
                  <a href={course.watchHref}>Link</a>
                </td>
                <td>{this.displayAuthor(course.authorId)}</td>
                <td>{course.length}</td>
                <td>{course.category}</td>
                <td>
                  <button type="button" onClick={() => this.editCourse(course)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => this.deleteCourse(course)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const fetchStoreData = state => {
  return {
    loading: state.authors.loading || state.courses.loading,
    error: !!state.authors.error || !!state.courses.error,
    authors: state.authors.data,
    courses: state.courses.data,
  };
};

const dispatchAction = dispatch => {
  return {
    loadAuthors: () => dispatch({ type: 'LOAD_AUTHORS_REQUEST' }),
    loadCourses: () => dispatch({ type: 'LOAD_COURSES_REQUEST' }),
  };
};

export default connect(
  fetchStoreData,
  dispatchAction,
)(home);
