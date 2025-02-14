import React from 'react';
import profile from "../images/profile.png";
import { Link } from 'react-router-dom';

function Sidebar({ userData }) {
  // Safely extract user data with optional chaining and default values
  const fields = userData?._document?.data?.value?.mapValue?.fields || {};

  const username = fields?.username?.stringValue || 'No Name';
  const profileImage = fields?.profile_image?.stringValue || profile;
  const designation = fields?.designation?.stringValue || 'No Designation';
  const phone = fields?.phone?.stringValue || 'No Phone';
  const address = fields?.address?.stringValue || 'No Address';
  const skills = fields?.skills?.stringValue || 'No skills listed';
  const newInvitationsCount = fields?.new_invitations_count?.integerValue || 0;

  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid #D6D6D6',
        width: '230px',
        borderRadius: '10px',
        marginLeft: '55px',
        padding: '15px',
      }}
    >
      {/* Profile Section */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <img
          src={profileImage}
          style={{ width: '65px', height: '65px', borderRadius: '40px', objectFit: 'cover' }}
          alt="Profile"
        />
        <h3 style={{ margin: '10px 0 5px 0' }}>{username}</h3>
        <h4 style={{ color: '#6F6F6F', margin: 0 }}>{designation}</h4>
      </div>

      {/* Contact Information */}
      <div
        style={{
          backgroundColor: '#F3F3F3',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      >
        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Contact Information</h4>
        <p style={{ margin: '10px 0', textAlign: 'center', fontSize: '14px', color: '#6F6F6F' }}>
          <strong>Phone: </strong>{phone}
        </p>
        <p style={{ margin: '10px 0', textAlign: 'center', fontSize: '14px', color: '#6F6F6F' }}>
          <strong>Address: </strong>{address}
        </p>
      </div>

      {/* Skills Section */}
      <div
        style={{
          backgroundColor: '#F3F3F3',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      >
        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Skills</h4>
        <p style={{ color: '#6F6F6F', fontSize: '14px', textAlign: 'center' }}>
          {skills}
        </p>
      </div>

      {/* Connections Section */}
      <div
        style={{
          backgroundColor: '#F3F3F3',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '10px',
          textAlign: 'center',
        }}
      >
        <Link
          to="/network"
          style={{
            textDecoration: 'none',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '18px',
            textAlign: 'center',
            display: 'inline-block',
          }}
          state={{
            username,
            designation,
            profile_img: profileImage,
          }}
        >
          My Connections
        </Link>
      </div>

      {/* Invitations Section */}
      <div
        style={{
          backgroundColor: '#F3F3F3',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '15px',
          position: 'relative',
        }}
      >
        <Link
          to="/invite"
          style={{
            textDecoration: 'none',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          state={{
            username,
            designation,
            profile_img: profileImage,
          }}
        >
          New Invitations
          {newInvitationsCount > 0 && (
            <span
              style={{
                marginLeft: '10px',
                backgroundColor: 'Blue',
                color: 'white',
                borderRadius: '50%',
                padding: '0 5px',
                fontSize: '12px',
              }}
            >
              {newInvitationsCount}
            </span>
          )}
        </Link>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          backgroundColor: '#F3F3F3',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      >
        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Recent Activity</h4>
        <ul style={{ fontSize: '14px', color: '#6F6F6F', padding: '0 10px' }}>
          <li>Commented on a job post</li>
          <li>Updated profile</li>
          <li>Connected with John Doe</li>
        </ul>
      </div>

      {/* Recent Posts */}
      <div
        style={{
          backgroundColor: '#F3F3F3',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Recent Posts</h4>
        <p style={{ fontSize: '14px', color: '#6F6F6F', textAlign: 'center' }}>
          "Looking for skilled workers in agriculture."
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
