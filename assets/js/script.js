// Fonction pour afficher le formulaire et changer la classe du bouton
 function showAddProductForm() {
    document.getElementById('product-list').style.display = 'none';
    document.getElementById('editProductForm').style.display = 'none';
    document.getElementById('addProductForm').style.display = 'block';
  }

  // Fonction pour obtenir et afficher tous les produits
  function getAllProducts() {

    $.ajax({
      url: "http://localhost:8091/api/products",
      method: "GET",
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiYTU2N2ZiNDBhODhlNDQ4NTc3MTI5ZTRmMWEyMzIwM2ZkNzMzYWM3NGExODhmZDQ2NDA1ZTY3N2NhODExOGQ5ZmMyYzQ5ZWViMzhmYzY3N2MiLCJpYXQiOjE3MTgyNDE4NzguMzk1NDcyLCJuYmYiOjE3MTgyNDE4NzguMzk1NDczLCJleHAiOjE3NDk3Nzc4NzguMzk0MzI0LCJzdWIiOiIxOCIsInNjb3BlcyI6W119.PqGyYI6qRh8TEe2wvRC7ypT3PQsGawfmLSxUFOdZw_cus8llIXkvJvaVLUvr8TMvJ_-cRn4kLXN6Ovp3GXMxaIgW04wvKXoI5p5akoQiThnrqZma_rhfKomM2ak8M5wYvKrv37Ito0Dkie6VK-OXqDekd60-p8_fbatzIM2cXGn0LiiqygzO9LXpLC5eF-1V60MTacCG26LqOGynqqVq9E8N-Dsso2KroAcYmGtCk5v-Ro2JmEIQFkaAPZNJebbJ2B04Bpn6Zkzv_1lTm3lV6gClT-fCy2du0qQSku0-06O_UBKxduFL3krzst1SxhXHnFzxBHpJZusdxD1DlsR3xfbxLCvQDaPQs-w0arktpMr3L_vM15u4nuhK_qdYIF3G-aPAd8EGKTr8AanUplSOlN7b0thuzCZWb1EOJFVBK8QROKElIXUQnb7nGjNJFZql7H5qqMyFZKZqc2-2IiTQht1HQd8kuvTEw3QH0rrPOBmqbPcAYN6cTi1F_3DMg0utUq3eyw-a7URtiF47TgHERC1EYH-g7_ProCkCMdup9WnKNdZBgbkFDDzCy8GB9rU4lwiRZCANOYp457kd6ftWekDTXM6g1b4Dze3zg-EgWERtbQx_wAZoRnlfSF3ZWTot8RVYM2Ed9szffDtZVLpWpAIAFxRz3xz6cpU4sWPon_M",
        "Content-Type": "application/json"
      },
      success: function (response) {
        // console.log(response);
        $('#products').empty();

        if (Array.isArray(response.data)) {
          response.data.forEach(function (product) {
            document.getElementById('addProductForm').style.display = 'none';
            document.getElementById('product-list').style.display = 'block';
            document.getElementById('editProductForm').style.display = 'none';
            const listButton = document.getElementById('listButton');
            listButton.classList.remove('second-button');
            listButton.classList.add('main-button'); 
            $('#products').append(
              `<li>${product.id} - ${product.name}, Prix: ${product.price}
                <button onclick="showEditProductForm(${product.id}, '${product.name}', '${product.description}', '${product.price}')" style="margin: 5px; padding: 5px; border-radius: 5px; background-color: green; border: none; color: #fff;">
              Modifier
            </button>
              <button onclick="deleteProduct(${product.id})" style="padding: 5px; border: none; border-radius: 5px; background-color: #dd0505; color: #fff;">Supprimer</button>
            </li>`
            );
          });
        } else {
          $('#products').append('<li>Aucun produit trouvé</li>');
        }
      }
    });
  }

  // Fonction pour envoyer les données du formulaire d'ajout de produit
  function addProduct() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    $.ajax({
      url: "http://localhost:8091/api/products",
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiYTU2N2ZiNDBhODhlNDQ4NTc3MTI5ZTRmMWEyMzIwM2ZkNzMzYWM3NGExODhmZDQ2NDA1ZTY3N2NhODExOGQ5ZmMyYzQ5ZWViMzhmYzY3N2MiLCJpYXQiOjE3MTgyNDE4NzguMzk1NDcyLCJuYmYiOjE3MTgyNDE4NzguMzk1NDczLCJleHAiOjE3NDk3Nzc4NzguMzk0MzI0LCJzdWIiOiIxOCIsInNjb3BlcyI6W119.PqGyYI6qRh8TEe2wvRC7ypT3PQsGawfmLSxUFOdZw_cus8llIXkvJvaVLUvr8TMvJ_-cRn4kLXN6Ovp3GXMxaIgW04wvKXoI5p5akoQiThnrqZma_rhfKomM2ak8M5wYvKrv37Ito0Dkie6VK-OXqDekd60-p8_fbatzIM2cXGn0LiiqygzO9LXpLC5eF-1V60MTacCG26LqOGynqqVq9E8N-Dsso2KroAcYmGtCk5v-Ro2JmEIQFkaAPZNJebbJ2B04Bpn6Zkzv_1lTm3lV6gClT-fCy2du0qQSku0-06O_UBKxduFL3krzst1SxhXHnFzxBHpJZusdxD1DlsR3xfbxLCvQDaPQs-w0arktpMr3L_vM15u4nuhK_qdYIF3G-aPAd8EGKTr8AanUplSOlN7b0thuzCZWb1EOJFVBK8QROKElIXUQnb7nGjNJFZql7H5qqMyFZKZqc2-2IiTQht1HQd8kuvTEw3QH0rrPOBmqbPcAYN6cTi1F_3DMg0utUq3eyw-a7URtiF47TgHERC1EYH-g7_ProCkCMdup9WnKNdZBgbkFDDzCy8GB9rU4lwiRZCANOYp457kd6ftWekDTXM6g1b4Dze3zg-EgWERtbQx_wAZoRnlfSF3ZWTot8RVYM2Ed9szffDtZVLpWpAIAFxRz3xz6cpU4sWPon_M",
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ name, description, price }),
      success: function (response) {
        if (response.success) {
          alert('Produit ajouté avec succès !');
          document.getElementById('productForm').reset();
          document.getElementById('addProductForm').style.display = 'none';
          document.getElementById('editProductForm').style.display = 'block';
          toggleButtonDisplay('listButton');
          getAllProducts();
        } else {
          console.log("Error: ", response.data);
          showError(response.data || 'Erreur lors de l\'ajout du produit');
        }
      },
      error: function (jqXHR) {
        // console.log("Error: ", response.data.price);
        showError(jqXHR.responseJSON.message || 'Erreur de connexion au serveur');
      }
    });
  }

  function showEditProductForm(id, name, description, price) {
    document.getElementById('editProductId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editDescription').value = description;
    document.getElementById('editPrice').value = price;

    document.getElementById('product-list').style.display = 'none';
    document.getElementById('addProductForm').style.display = 'none';
    document.getElementById('editProductForm').style.display = 'block';
  }


  // Fonction pour mettre à jour un produit
function updateProduct() {
const id = document.getElementById('editProductId').value;
const name = document.getElementById('editName').value;
const description = document.getElementById('editDescription').value;
const price = document.getElementById('editPrice').value;

$.ajax({
  url: `http://localhost:8091/api/products/${id}`,
  method: "PUT",
  headers: {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiYTU2N2ZiNDBhODhlNDQ4NTc3MTI5ZTRmMWEyMzIwM2ZkNzMzYWM3NGExODhmZDQ2NDA1ZTY3N2NhODExOGQ5ZmMyYzQ5ZWViMzhmYzY3N2MiLCJpYXQiOjE3MTgyNDE4NzguMzk1NDcyLCJuYmYiOjE3MTgyNDE4NzguMzk1NDczLCJleHAiOjE3NDk3Nzc4NzguMzk0MzI0LCJzdWIiOiIxOCIsInNjb3BlcyI6W119.PqGyYI6qRh8TEe2wvRC7ypT3PQsGawfmLSxUFOdZw_cus8llIXkvJvaVLUvr8TMvJ_-cRn4kLXN6Ovp3GXMxaIgW04wvKXoI5p5akoQiThnrqZma_rhfKomM2ak8M5wYvKrv37Ito0Dkie6VK-OXqDekd60-p8_fbatzIM2cXGn0LiiqygzO9LXpLC5eF-1V60MTacCG26LqOGynqqVq9E8N-Dsso2KroAcYmGtCk5v-Ro2JmEIQFkaAPZNJebbJ2B04Bpn6Zkzv_1lTm3lV6gClT-fCy2du0qQSku0-06O_UBKxduFL3krzst1SxhXHnFzxBHpJZusdxD1DlsR3xfbxLCvQDaPQs-w0arktpMr3L_vM15u4nuhK_qdYIF3G-aPAd8EGKTr8AanUplSOlN7b0thuzCZWb1EOJFVBK8QROKElIXUQnb7nGjNJFZql7H5qqMyFZKZqc2-2IiTQht1HQd8kuvTEw3QH0rrPOBmqbPcAYN6cTi1F_3DMg0utUq3eyw-a7URtiF47TgHERC1EYH-g7_ProCkCMdup9WnKNdZBgbkFDDzCy8GB9rU4lwiRZCANOYp457kd6ftWekDTXM6g1b4Dze3zg-EgWERtbQx_wAZoRnlfSF3ZWTot8RVYM2Ed9szffDtZVLpWpAIAFxRz3xz6cpU4sWPon_M",
    "Content-Type": "application/json"
  },
  data: JSON.stringify({ name, description, price }),
  success: function (response) {
    if (response.success) {
      alert('Produit modifié avec succès !');
      document.getElementById('editProductForm').style.display = 'none'; 
      getAllProducts();
    } else {
      showEditError(response.message || 'Erreur lors de la modification du produit');
    }
  },
    error: function (jqXHR) {
      showEditError(jqXHR.responseJSON.message || 'Erreur de connexion au serveur');
    }
  });
}

function deleteProduct(productId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      $.ajax({
          url: `http://localhost:8091/api/products/${productId}`,
          type: 'DELETE',
          headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiYTU2N2ZiNDBhODhlNDQ4NTc3MTI5ZTRmMWEyMzIwM2ZkNzMzYWM3NGExODhmZDQ2NDA1ZTY3N2NhODExOGQ5ZmMyYzQ5ZWViMzhmYzY3N2MiLCJpYXQiOjE3MTgyNDE4NzguMzk1NDcyLCJuYmYiOjE3MTgyNDE4NzguMzk1NDczLCJleHAiOjE3NDk3Nzc4NzguMzk0MzI0LCJzdWIiOiIxOCIsInNjb3BlcyI6W119.PqGyYI6qRh8TEe2wvRC7ypT3PQsGawfmLSxUFOdZw_cus8llIXkvJvaVLUvr8TMvJ_-cRn4kLXN6Ovp3GXMxaIgW04wvKXoI5p5akoQiThnrqZma_rhfKomM2ak8M5wYvKrv37Ito0Dkie6VK-OXqDekd60-p8_fbatzIM2cXGn0LiiqygzO9LXpLC5eF-1V60MTacCG26LqOGynqqVq9E8N-Dsso2KroAcYmGtCk5v-Ro2JmEIQFkaAPZNJebbJ2B04Bpn6Zkzv_1lTm3lV6gClT-fCy2du0qQSku0-06O_UBKxduFL3krzst1SxhXHnFzxBHpJZusdxD1DlsR3xfbxLCvQDaPQs-w0arktpMr3L_vM15u4nuhK_qdYIF3G-aPAd8EGKTr8AanUplSOlN7b0thuzCZWb1EOJFVBK8QROKElIXUQnb7nGjNJFZql7H5qqMyFZKZqc2-2IiTQht1HQd8kuvTEw3QH0rrPOBmqbPcAYN6cTi1F_3DMg0utUq3eyw-a7URtiF47TgHERC1EYH-g7_ProCkCMdup9WnKNdZBgbkFDDzCy8GB9rU4lwiRZCANOYp457kd6ftWekDTXM6g1b4Dze3zg-EgWERtbQx_wAZoRnlfSF3ZWTot8RVYM2Ed9szffDtZVLpWpAIAFxRz3xz6cpU4sWPon_M",
            "Content-Type": "application/json"
          },
          success: function(response) {
              if (response.success) { 
                  alert('Produit supprimé avec succès !');
                  getAllProducts();
                  document.getElementById('editProductForm').style.display = 'none';
              } else {
                //   console.log("Erreur: ", response.message);
                  showError(response.message || 'Erreur lors de la suppression du produit');
              }
          },
          error: function(jqXHR) {
            //   console.log("Erreur: ", jqXHR.responseJSON.message);
              showError(jqXHR.responseJSON.message || 'Erreur de connexion au serveur');
          }
      });
  }
}


  // Fonction pour afficher un message d'erreur pour l'ajout d'un produit
function showEditError(message) {
  const errorMessage = document.getElementById('editErrorMessage');
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
}


  // Fonction pour afficher un message d'erreur pour l'ajout d'un produit
  function showError(errorMessages) {
    const errorContainer = document.getElementById('errorMessage');
    errorContainer.innerHTML = '';  // Réinitialise les erreurs précédentes
    
    if (typeof errorMessages === 'string') {
      errorContainer.innerHTML = errorMessages;
    } else {
      for (const [field, messages] of Object.entries(errorMessages)) {
        messages.forEach(message => {
          const errorItem = document.createElement('p');
          errorItem.textContent = message;
          errorContainer.appendChild(errorItem);
        });
      }
    }
    errorContainer.style.display = 'block';
  }


  // Fonction pour afficher le bouton cliqué en ative
function toggleButtonDisplay(clickedButtonId) {
const buttons = ['listButton', 'addButton'];

buttons.forEach(buttonId => {
  const button = document.getElementById(buttonId);

  if (buttonId === clickedButtonId) {
    button.classList.remove('second-button');
    button.classList.add('main-button');
  } else {
    button.classList.remove('main-button');
    button.classList.add('second-button');
  }
});

}

// Modifier les événements onclick pour chaque bouton pour appeler toggleButtonDisplay
document.getElementById('listButton').onclick = function () {
toggleButtonDisplay('listButton');
getAllProducts(); 
};

document.getElementById('addButton').onclick = function () {
toggleButtonDisplay('addButton');
showAddProductForm();
};

document.addEventListener('DOMContentLoaded', getAllProducts);
