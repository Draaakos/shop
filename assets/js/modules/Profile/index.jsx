import React from 'react';
import History from './components/History';

const Profile = ({ initialData }) => (
  <section className="page">
    <div className="profile-section">
      <div className="strong">Datos personales</div><hr/>
      <div className="grid grid-2">
        <div><span className="strong">Nombre:</span> {initialData.person.firstName}</div>
        <div><span className="strong">Apellido:</span> {initialData.person.lastName}</div>
      </div>
      <div className="grid grid-2">
        <div><span className="strong">Correo:</span> {initialData.person.email}</div>
        <div><span className="strong">Télefono:</span> {initialData.person.phone}</div>
      </div>
    </div>

    <div>
      <div className="history-section">
        <div className="strong">Historial de compras</div><hr/>
      </div>

      <History historyList={initialData.purchaseList} />
    </div>
  </section>
);

export default Profile;
