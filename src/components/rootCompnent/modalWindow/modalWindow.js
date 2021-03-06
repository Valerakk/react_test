import React, { Component } from "react";
import classes from "./modalWindow.css";

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.book,
      errors: { name: "", author: "", stars: "" },
    };
  }

  classs = classes.ModalActive + " " + classes.ModalWindow;

  componentDidUpdate(prevProps) {
    if (prevProps.book !== this.props.book)
      this.setState({ ...this.props.book });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: value ? "" : "Поле не повинно бути пустим",
      },
    });
  };

  render() {
    const { handleSubmit} = this.props;
    return (
      <div
        className={this.props.active ? this.classs : classes.ModalWindow}
        onClick={() => this.props.setActive(false)}
      >
        <div
          className={classes.ModalContent}
          onClick={(e) => e.stopPropagation()}
        >

        <div className={classes.BookElemLI}>
          <form>
            <b> Автор:</b>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            {this.state.errors.author &&
              this.state.errors.author.length > 0 && (
                <span>{this.state.errors.author}</span>
              )}
            <br />
            <b>Назва:</b>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            {this.state.errors.name && this.state.errors.name.length > 0 && (
              <span>{this.state.errors.name}</span>
            )}
            <br />
            <b>Оцінка:</b>
            <input
              type="number"
              name="stars"
              value={this.state.stars}
              onChange={this.handleChange}
            />
            {this.state.errors.stars && this.state.errors.stars.length > 0 && (
              <span>{this.state.errors.stars}</span>
            )}
            <br />
            <button
              type="button"
              disabled={
                !this.state.author || !this.state.name || !this.state.stars
              }
              onClick={() => handleSubmit(this.state)}
            >
              Зберегти
            </button>
            <button type="reset" onClick={() => this.props.setActive(false)}>
              Скасувати
            </button>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default ModalWindow;
