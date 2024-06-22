import './DialogTemplate.css'

const DialogTemplate = ({ children }) => {
  return (
    <div className="Overlay">
      <div className="DialogContainer">
        {children}
      </div>
    </div>
  );
}

export default DialogTemplate;