const opportunities = [
    { id: 1, title: "Tech Skills Workshop Instructor", org: "Digital Inclusion Project", img: "photo-6.jpg", skills: ["Teaching", "Technical Knowledge", "Patience"], interests: ["Technology", "Education"] },
    { id: 2, title: "Afterschool Tutoring Program", org: "Education For All", img: "photo-2.avif", skills: ["Teaching", "Patience", "Communication"], interests: ["Education", "Youth Development"] },
    { id: 3, title: "Homeless Shelter Meal Service", org: "City Shelter Network", img: "photo-3.avif", skills: ["Food Handling", "Compassion", "Teamwork"], interests: ["Food Security", "Community Building"] },
    { id: 4, title: "Community Garden Maintenance", org: "Green Spaces Initiative", img: "photo-1.avif", skills: ["Gardening", "Physical Labor"], interests: ["Environment", "Food Security"] },
    { id: 5, title: "Senior Companion Program", org: "Elder Care Alliance", img: "photo-4.avif", skills: ["Empathy", "Listening", "Patience"], interests: ["Senior Services", "Healthcare Access"] },
    { id: 6, title: "Animal Shelter Assistant", org: "Paws & Claws Rescue", img: "photo-5.avif", skills: ["Animal Handling", "Compassion"], interests: ["Animal Welfare"] }
];

const volunteers = [
    { id: 0, name: "Alex Johnson", location: "Downtown", img: "profile-1.jpg", bio: "Software engineer looking to give back to my community through tech education and mentorship.", skills: ["Teaching", "Web Development", "Spanish Language"], interests: ["Education", "Technology", "Youth Development"], availability: ["Weekday Evenings", "Saturday Mornings"] },
    { id: 1, name: "Maria Rodriguez", location: "Westside", img: "profile-2.jpg", bio: "Community organizer passionate about sustainable urban agriculture and food justice.", skills: ["Gardening", "Event Planning"], interests: ["Environment", "Community Building", "Food Security"], availability: ["Weekends", "Friday Afternoons"] },
    { id: 2, name: "David Chen", location: "Northside", img: "profile-3.jpg", bio: "Retired nurse looking to continue helping others through volunteer service.", skills: ["Healthcare", "First Aid", "Driving"], interests: ["Senior Services", "Healthcare Access", "Transportation"], availability: ["Monday", "Wednesday", "Friday Mornings"] },
    { id: 3, name: "Jasmine Williams", location: "Eastside", img: "profile-4.jpg", bio: "Art therapist who believes in the healing power of creative expression.", skills: ["Arts & Crafts", "Music", "Working with Children"], interests: ["Youth Programs", "Arts Education", "Mental Health"], availability: ["Weekday Afternoons", "Some Weekends"] }
];

const selectorContainer = document.getElementById('volunteer-selectors');
const selectedProfileContainer = document.getElementById('selected-profile-container');
const recommendedOppsContainer = document.getElementById('recommended-opportunities-container');

function displaySelectedProfile(volunteer) {
    const profileHTML = `
        <div class="selected-profile-card">
            <div class="text-center">
                <img src="${volunteer.img}" alt="${volunteer.name}" class="profile-pic">
                <h5 class="fw-bold">${volunteer.name}</h5>
                <p class="text-muted">📍 ${volunteer.location}</p>
            </div>
            <p class="mt-3">${volunteer.bio}</p>
            <strong>Skills:</strong>
            <div class="mb-2">${volunteer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join(' ')}</div>
            <strong>Interests:</strong>
            <div class="mb-2">${volunteer.interests.map(interest => `<span class="skill-tag">${interest}</span>`).join(' ')}</div>
            <strong>Availability:</strong>
            <div>${volunteer.availability.map(avail => `<span class="availability-tag">${avail}</span>`).join(' ')}</div>
            <a href="#" class="btn btn-primary w-100 mt-4">View Profile</a>
        </div>
    `;
    selectedProfileContainer.innerHTML = profileHTML;
}

function displayRecommendations(volunteer) {
    const matchedOpps = opportunities.filter(opp => 
        volunteer.skills.some(skill => opp.skills.includes(skill)) ||
        volunteer.interests.some(interest => opp.interests.includes(interest))
    );
    
    let recommendationsHTML = '<h4 class="mb-3">✨ Recommended Opportunities</h4>';
    
    if (matchedOpps.length > 0) {
        matchedOpps.forEach(opp => {
            recommendationsHTML += `
                <div class="opportunity-card-detailed">
                    <img src="${opp.img}" class="card-img-top" alt="${opp.title}">
                    <div class="card-body">
                        <h5 class="card-title">${opp.title}</h5>
                        <p class="card-text text-muted">${opp.org}</p>
                        <p><strong>Skills Needed:</strong></p>
                        <div>${opp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join(' ')}</div>
                    </div>
                    <div class="card-footer">
                         <a href="#" class="btn btn-primary w-100">View Details</a>
                    </div>
                </div>
            `;
        });
    } else {
        recommendationsHTML += "<p>No specific matches found.</p>";
    }
    
    recommendedOppsContainer.innerHTML = recommendationsHTML;
}

function updateActiveSelector(selectedId) {
    const allSelectors = document.querySelectorAll('.volunteer-selector-card');
    allSelectors.forEach(selector => {
        selector.classList.remove('active');
        if (parseInt(selector.getAttribute('data-volunteer-id')) === selectedId) {
            selector.classList.add('active');
        }
    });
}

volunteers.forEach(volunteer => {
    const selectorHTML = `
        <div class="volunteer-selector-card" data-volunteer-id="${volunteer.id}">
            <img src="${volunteer.img}" alt="${volunteer.name}">
            <div>
                <strong>${volunteer.name}</strong><br>
                <small class="text-muted">${volunteer.location}</small>
            </div>
        </div>
    `;
    selectorContainer.innerHTML += selectorHTML;
});

const profileSelectors = document.querySelectorAll('.volunteer-selector-card');
profileSelectors.forEach(selector => {
    selector.addEventListener('click', () => {
        const volunteerId = parseInt(selector.getAttribute('data-volunteer-id'));
        const selectedVolunteer = volunteers.find(v => v.id === volunteerId);
        
        updateActiveSelector(volunteerId);
        displaySelectedProfile(selectedVolunteer);
        displayRecommendations(selectedVolunteer);
    });
});

profileSelectors[0].click();