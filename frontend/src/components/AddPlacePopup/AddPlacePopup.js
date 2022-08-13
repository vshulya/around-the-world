import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
      title="New place"
    >
      <label className="pop-up__field">
        <input type="text" id="place-input" value={name || ''} onChange={handleNameChange} placeholder="Name" name="name"
          className="pop-up__input pop-up__input_type_place" minLength="2" maxLength="30" required />
        <span id="place-input-error" className="pop-up__input-error"></span>
      </label>
      <label className="pop-up__field">
        <input type="url" id="link-input" value={link || ''} onChange={handleLinkChange} placeholder="Photo url" name="link"
          className="pop-up__input pop-up__input_type_link" required />
        <span id="link-input-error" className="pop-up__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;