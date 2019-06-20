import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    changeLocale: PropTypes.func.isRequired,
  };

  state = {
    courses: [],
    authors: [],
    error: false,
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
    this.fetchData();
  }

  componentDidMount() {
    const { changeLocale } = this.props;
    changeLocale();
  }

  fetchData = async () => {
    try {
      const fetchCourses = fetch('http://localhost:3004/courses');
      const fetchAuthors = fetch('http://localhost:3004/authors');
      const res = await Promise.all([fetchCourses, fetchAuthors]);
      const courses = await res[0].json();
      const authors = await res[1].json();
      this.setState({ courses, authors });
    } catch (error) {
      console.log(error);
    }
  };

  displayAuthor = id => {
    const { authors } = this.state;
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
    try {
      fetch(`http://localhost:3004/courses/${course.id}`, {
        method: 'DELETE',
      });
      this.setState(state => {
        return {
          courses: state.courses.filter(x => x.id !== course.id),
        };
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    const { courses, error } = this.state;
    return (
      <div>
        {error && <span>Oops! something went wrong</span>}
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
    locale: state.locale,
  };
};

const dispatchAction = dispatch => {
  return {
    changeLocale: () => dispatch({ type: 'CHANGE_LOCALE' }),
  };
};

export default connect(
  fetchStoreData,
  dispatchAction,
)(home);
