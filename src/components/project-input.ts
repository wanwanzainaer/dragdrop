import { Component } from './base-components';
import { Validatable, validate } from '../utils/validation';
import { projectState } from '../state/project-state';
import { autobind } from '../decorators/autobind';
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescrition = this.descriptionInputElement.value;
    const enteredPeolple = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescrition,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeolple,
      required: true,
      min: 1,
    };

    if (
      validate(titleValidatable) ||
      validate(descriptionValidatable) ||
      validate(peopleValidatable)
    ) {
      alert('Invalid input, pplease try it again!!!');
      return;
    } else {
      return [enteredTitle, enteredDescrition, +enteredPeolple];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
  renderContent() {}

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}
