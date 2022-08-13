import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  //after API setting user data for currect user
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
      title="Edit profile"
    >
      <label className="pop-up__field">
        <input type="text" value={name || ''} onChange={handleNameChange} placeholder="Name" id="name-input" name="name"
          className="pop-up__input pop-up__input_type_name" minLength="2" maxLength="40" required />
        <span id="name-input-error" className="pop-up__input-error"></span>
      </label>
      <label className="pop-up__field">
        <input type="text" value={description || ''} onChange={handleDescriptionChange} id="job-input" placeholder="About" name="about"
          className="pop-up__input pop-up__input_type_job" minLength="2" maxLength="200" required />
        <span id="job-input-error" className="pop-up__input-error"></span>
      </label>
    </PopupWithForm>)
}

export default EditProfilePopup;