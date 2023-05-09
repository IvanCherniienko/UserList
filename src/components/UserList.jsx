import React, { useState, useEffect } from 'react'

function UserList() {
  const [users, setUsers] = useState([])
  const [albums, setAlbums] = useState([])
  const [photos, setPhotos] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${selectedUser.id}`)
        .then(response => response.json())
        .then(data => setAlbums(data))
        .catch(error => console.error(error))
    } else {
      setAlbums([])
      setSelectedAlbum(null)
    }
  }, [selectedUser])

  useEffect(() => {
    if (selectedAlbum) {
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbum.id}`)
        .then(response => response.json())
        .then(data => setPhotos(data))
        .catch(error => console.error(error))
    } else {
      setPhotos([])
    }
  }, [selectedAlbum])

  function handleUserClick(user) {
    setSelectedUser(user)
  }

  function handleAlbumClick(album) {
    setSelectedAlbum(album)
  }

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleUserClick(user)}>Albums</button>
            {selectedUser && selectedUser.id === user.id && (
              <ul>
                {albums.map(album => (
                  <li key={album.id}>
                    {album.title}
                    <button onClick={() => handleAlbumClick(album)}>Photos</button>
                    {selectedAlbum && selectedAlbum.id === album.id && (
                      <ul>
                        {photos.map(photo => (
                          <li key={photo.id}>
                            <img src={photo.url} alt={photo.title} width="50" height="50"/>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList
