const getCurrentTitle = () => {
  const button = document.getElementById("button");

  button.addEventListener("click", async () => {
    const linkedinProfiles = [
      "https://www.linkedin.com/in/priyanshi-rathour-72a65a237",
      "https://www.linkedin.com/in/priyanshi-rathour-72a65a237",
      "https://www.linkedin.com/in/priyanshi-rathour-72a65a237",
    ];
    const scrapeAndPostData = async (profileUrl) => {
      const tab = chrome.tabs.create({ url: profileUrl, active: false });
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: () => {
            const profileData = {};
            const nameElement = document.querySelector(
              ".pv-top-card-section .pv-top-card-section__name"
            );
            if (nameElement) {
              profileData.name = nameElement.textContent.trim();
            }

            const locationElement = document.querySelector(
              ".pv-top-card-section .pv-top-card-section__location"
            );
            if (locationElement) {
              profileData.location = locationElement.textContent.trim();
            }

            const aboutElement = document.querySelector(
              ".pv-about-section .pv-about__summary-text"
            );
            if (aboutElement) {
              profileData.about = aboutElement.textContent.trim();
            }

            const bioElement = document.querySelector(
              ".pv-about-section .pv-about__description"
            );
            if (bioElement) {
              profileData.bio = bioElement.textContent.trim();
            }

            const followerCountElement = document.querySelector(
              ".pv-recent-activity-section .pv-recent-activity-section__follower-count"
            );
            if (followerCountElement) {
              profileData.followerCount = parseInt(
                followerCountElement.textContent.trim().replace(",", ""),
                10
              );
            }

            const connectionCountElement = document.querySelector(
              ".pv-top-card-section .pv-top-card-v2-section__connections .pv-top-card-v2-section__connections-count"
            );
            if (connectionCountElement) {
              profileData.connectionCount = parseInt(
                connectionCountElement.textContent.trim().replace(",", ""),
                10
              );
            }
            return profileData;
          },
        },
        async (result) => {
          const profileData = result[0];

          try {
            const response = await fetch("http://localhost:3000/api/profiles", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(profileData),
            });

            if (response.ok) {
              console.log("Data sent to the server:", profileData);
            } else {
              console.error(
                "Failed to send data:",
                response.status,
                response.statusText
              );
            }
          } catch (error) {
            console.error("Error sending data:", error);
          }
        }
      );
    };
    linkedinProfiles.forEach((profileUrl) => {
      scrapeAndPostData(profileUrl);
    });
  });
};

window.addEventListener("load", () => {
  getCurrentTitle();
});
