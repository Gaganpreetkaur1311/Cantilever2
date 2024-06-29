// JavaScript for fetching and displaying news articles
let currentPage = 1;
let currentQuery = 'Apple';
let currentFilter = 'all';
let currentSort = 'popularity';

const fetchNews = async (page, query, filter, sort) => {
  console.log("Fetching news...");

  // Building the URL based on filters and query
  let url = `https://newsapi.org/v2/everything?q=${query}&from=2024-06-26&page=${page}&sortBy=${sort}&apiKey=7927de64763b4070acd5bb06717cd786`;

  if (filter !== 'all') {
    // Use top-headlines endpoint for specific categories
    url = `https://newsapi.org/v2/top-headlines?category=${filter}&q=${query}&page=${page}&sortBy=${sort}&apiKey=7927de64763b4070acd5bb06717cd786`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles) {
      document.querySelector('.content').innerHTML = ''; // Clear previous content
      data.articles.forEach(article => {
        const card = `
          <div class="col-md-4">
            <div class="card my-4 mx-2">
              <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="News Image">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
              </div>
            </div>
          </div>`;
        document.querySelector('.content').innerHTML += card;
      });

      document.getElementById('resultCount').innerText = data.articles.length;
    } else {
      console.log("No articles found.");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

const updatePage = (increment) => {
  currentPage += increment;
  fetchNews(currentPage, currentQuery, currentFilter, currentSort);
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    updatePage(-1);
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  updatePage(1);
});

document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  currentQuery = document.getElementById('searchInput').value || 'Apple';
  currentPage = 1; // Reset to first page on new search
  fetchNews(currentPage, currentQuery, currentFilter, currentSort);
});

document.getElementById('filter').addEventListener('change', (e) => {
  currentFilter = e.target.value;
  currentPage = 1; // Reset to first page on new filter
  fetchNews(currentPage, currentQuery, currentFilter, currentSort);
});

document.getElementById('sort').addEventListener('change', (e) => {
  currentSort = e.target.value;
  currentPage = 1; // Reset to first page on new sort
  fetchNews(currentPage, currentQuery, currentFilter, currentSort);
});

// Filter navigation links
document.getElementById('filterSports').addEventListener('click', (e) => {
  e.preventDefault();
  currentQuery = 'sports';
  currentFilter = 'sports';
  currentPage = 1;
  fetchNews(currentPage, currentQuery, currentFilter, currentSort);
});

document.getElementById('filterWeather').addEventListener('click', (e) => {
  e.preventDefault();
  currentQuery = 'weather';
  currentFilter = 'weather';
  currentPage = 1;
  fetchNews(currentPage, currentQuery, currentFilter, currentSort);
});

document.getElementById('filterTechnology').addEventListener('click', (e) => {
  e.preventDefault();
  currentQuery = 'technology';
  currentFilter = 'technology';
  currentPage = 1;
  fetchNews(currentPage, currentQuery, currentFilter, currentSort);
});

// Placeholder login and register form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Logged in!');
  document.getElementById('authModal').querySelector('.btn-close').click();
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Registered!');
  document.getElementById('authModal').querySelector('.btn-close').click();
});

// Call the function to fetch news on page load
fetchNews(currentPage, currentQuery, currentFilter, currentSort);

// Function to save user data to localStorage
const saveUserData = (email, password) => {
    const userData = {
      email: email,
      password: password // Note: For demonstration only. Don't store passwords in plain text in production.
    };
  
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  // Function to retrieve user data from localStorage
  const getUserData = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  
  // Function to clear user data from localStorage
  const clearUserData = () => {
    localStorage.removeItem('user');
  };
  
  // Login form submission
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const storedUser = getUserData();
  
    // Check if user is registered and password matches
    if (storedUser && storedUser.email === email) {
      if (storedUser.password === password) {
        alert('Logged in successfully!');
        console.log('User logged in:', storedUser);
        document.getElementById('loginFeedback').textContent = '';
        document.getElementById('authModal').querySelector('.btn-close').click();
      } else {
        document.getElementById('loginFeedback').textContent = 'Invalid password. Please try again.';
      }
    } else {
      document.getElementById('loginFeedback').textContent = 'User not found. Please register.';
    }
  });
  
  // Registration form submission
  document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
  
    // Check if the email is already registered
    const storedUser = getUserData();
    if (storedUser && storedUser.email === email) {
      document.getElementById('registerFeedback').textContent = 'Email is already registered. Please log in.';
      document.getElementById('registerFeedback').classList.remove('text-success');
      document.getElementById('registerFeedback').classList.add('text-danger');
    } else {
      // Save user data
      saveUserData(email, password);
      document.getElementById('registerFeedback').textContent = 'Registered successfully!';
      document.getElementById('registerFeedback').classList.remove('text-danger');
      document.getElementById('registerFeedback').classList.add('text-success');
      document.getElementById('authModal').querySelector('.btn-close').click();
    }
  });
  
  // Logout button functionality
  document.getElementById('logoutButton').addEventListener('click', () => {
    clearUserData();
    alert('Logged out successfully!');
  });
  