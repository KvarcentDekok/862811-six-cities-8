import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ReviewForm from './review-form';
import { ratingValues } from '../../utils/utils';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isCommentSending: false},
    });

    const {getByLabelText, getByTitle, getByPlaceholderText, getByDisplayValue, container} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId='1' />
        </Router>
      </Provider>,
    );

    for (let i = 0; i < ratingValues.length; i++) {
      expect(getByTitle(new RegExp(ratingValues[i].name, 'i'))).toBeInTheDocument();
    }

    expect(getByLabelText('Your review')).toBeInTheDocument();

    userEvent.click(getByTitle(new RegExp(ratingValues[0].name, 'i')));
    userEvent.type(getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), 'review');

    expect(container.querySelectorAll('.form__rating-input')[0]).toBeChecked();
    expect(getByDisplayValue(/review/i)).toBeInTheDocument();
  });

  it('shouldn\'t disable controls when comment not sending', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isCommentSending: false},
    });

    const {getByPlaceholderText, container} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId='1' />
        </Router>
      </Provider>,
    );

    for (let i = 0; i < ratingValues.length; i++) {
      expect(container.querySelectorAll('.form__rating-input')[i]).not.toBeDisabled();
    }

    expect(getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).not.toBeDisabled();
  });

  it('should disable controls when comment sending', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isCommentSending: true},
    });

    const {getByPlaceholderText, container} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId='1' />
        </Router>
      </Provider>,
    );

    for (let i = 0; i < ratingValues.length; i++) {
      expect(container.querySelectorAll('.form__rating-input')[i]).toBeDisabled();
    }

    expect(getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeDisabled();
  });

  it('should disable submit button when comment sending', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isCommentSending: true},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId='1' />
        </Router>
      </Provider>,
    );

    expect(getByText('Submit')).toBeDisabled();
  });

  it('should disable submit button when rating doesn\'t selected or comment length < 50', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isCommentSending: false},
    });

    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId='1' />
        </Router>
      </Provider>,
    );

    for (let i = 0; i < 49; i++) {
      userEvent.type(getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), 'a');
    }

    expect(getByText('Submit')).toBeDisabled();
  });

  it('shouldn\'t disable submit button when rating selected and comment length >= 50 and comment not sending', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isCommentSending: false},
    });

    const {getByText, getByPlaceholderText, getByTitle} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId='1' />
        </Router>
      </Provider>,
    );

    userEvent.click(getByTitle(new RegExp(ratingValues[0].name, 'i')));

    for (let i = 0; i < 51; i++) {
      userEvent.type(getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), 'a');
    }

    expect(getByText('Submit')).not.toBeDisabled();
  });
});
