document.addEventListener("DOMContentLoaded", () => {
  let socket;
  let currentPoll = null;
  let hasVoted = false;

  function initializeSocket() {
    // Disconnect existing socket if any
    if (socket) {
      socket.disconnect();
    }

    // Create new socket connection
    socket = io("http://localhost:8080", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket connection event handlers
    socket.on("connect", () => {
      console.log("Socket connected");
      // Request current poll state on connection
      socket.emit("requestPollState");
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      updateUIToDisconnectedState();
    });

    // Poll update handler
    socket.on("pollupdate", (poll) => {
      currentPoll = poll;
      if (poll) {
        updateOwnerSection(false);
        updatePollSection(poll);
      }
    });

    // Poll results handler
    socket.on("pollresults", (results) => {
      updateResultsSection(results);
      resetVotingState();
    });

    // Reconnection handler
    socket.on("reconnect", () => {
      console.log("Socket reconnected");
      socket.emit("requestPollState");
    });
  }

  function updateUIToDisconnectedState() {
    const pollSection = document.getElementById("pollSection");
    const ownerSection = document.getElementById("ownerSection");
    const resultsSection = document.getElementById("resultsSection");

    pollSection.style.display = "none";
    resultsSection.style.display = "none";
    ownerSection.style.display = "block";

    // Show connection error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Connection lost. Please try again.";
    errorMessage.style.color = "red";
    errorMessage.style.textAlign = "center";
    ownerSection.appendChild(errorMessage);
  }

  function resetVotingState() {
    hasVoted = false;
    currentPoll = null;
  }

  function updateOwnerSection(show = false) {
    document.getElementById("ownerSection").style.display = show
      ? "block"
      : "none";
  }

  function updatePollSection(poll) {
    const pollSection = document.getElementById("pollSection");
    const pollOptionsDiv = document.getElementById("pollOptions");

    if (!poll) {
      pollSection.style.display = "none";
      return;
    }

    // Remove any existing thank you message
    const existingThankYouMessage = document.getElementById("thankYouMessage");
    if (existingThankYouMessage) {
      existingThankYouMessage.remove();
    }

    pollSection.style.display = "block";
    document.getElementById("pollQuestion").textContent = poll.question;
    pollOptionsDiv.innerHTML = "";

    const form = document.createElement("div");
    form.id = "pollForm";

    Object.keys(poll.options).forEach((option) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "pollOption";
      radio.value = option;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      form.appendChild(label);
      form.appendChild(document.createElement("br"));
    });

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Submit Vote";

    submitButton.onclick = (event) => {
      event.preventDefault();

      if (hasVoted) {
        alert("You have already voted in this poll!");
        return;
      }

      const selectedOption = form.querySelector(
        'input[name="pollOption"]:checked'
      );
      if (selectedOption) {
        // Disable all voting elements
        form.querySelectorAll('input[name="pollOption"]').forEach((input) => {
          input.disabled = true;
        });
        submitButton.disabled = true;

        // Create and append persistent thank you message
        const thankYouMessage = document.createElement("p");
        thankYouMessage.id = "thankYouMessage";
        thankYouMessage.textContent =
          "Thank you for your vote! Results will be displayed soon.";
        thankYouMessage.style.color = "green";
        thankYouMessage.style.fontWeight = "bold";
        pollOptionsDiv.appendChild(thankYouMessage);

        // Emit vote
        socket.emit("vote", selectedOption.value);

        // Mark as voted
        hasVoted = true;
      } else {
        alert("Please select an option to vote!");
      }
    };

    form.appendChild(submitButton);
    pollOptionsDiv.appendChild(form);

    // If already voted, keep the thank you message and disable voting
    if (hasVoted) {
      form.querySelectorAll("input").forEach((input) => {
        input.disabled = true;
      });
      submitButton.disabled = true;

      // Recreate thank you message
      const thankYouMessage = document.createElement("p");
      thankYouMessage.id = "thankYouMessage";
      thankYouMessage.textContent =
        "Thank you for your vote! Results will be displayed soon.";
      thankYouMessage.style.color = "green";
      thankYouMessage.style.fontWeight = "bold";
      pollOptionsDiv.appendChild(thankYouMessage);
    }
  }

  function updateResultsSection(results) {
    const pollSection = document.getElementById("pollSection");
    const resultsSection = document.getElementById("resultsSection");
    const resultsDiv = document.getElementById("results");

    pollSection.style.display = "none";
    resultsSection.style.display = "block";

    resultsDiv.innerHTML = `<strong>${results.question}</strong><br>`;

    for (const [option, votes] of Object.entries(results.results)) {
      resultsDiv.innerHTML += `${option}: ${votes} votes<br>`;
    }
  }

  function createPoll() {
    const question = document.getElementById("question").value.trim();
    const options = document
      .getElementById("options")
      .value.split(",")
      .map((o) => o.trim())
      .filter((o) => o);
    const duration = parseInt(document.getElementById("duration").value);

    if (!question || options.length < 2 || isNaN(duration) || duration <= 0) {
      alert("Please provide valid inputs!");
      return;
    }

    socket.emit("createpoll", { question, options, duration });

    // Reset voting state
    hasVoted = false;
    currentPoll = null;
  }

  // Initialize socket connection
  initializeSocket();

  // Attach event listener to the "Create Poll" button
  document
    .getElementById("createPollButton")
    .addEventListener("click", createPoll);
});
