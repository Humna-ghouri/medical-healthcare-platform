import { ref, set, get, child, update } from "firebase/database";
import { database } from "../firebase";

// Function to create a new user in the database
export const createUser = async (userId, userData) => {
  try {
    await set(ref(database, 'users/' + userId), {
      ...userData,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Function to get user data from the database
export const getUser = async (userId) => {
  try {
    const snapshot = await get(child(ref(database), `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

// Function to update user data
export const updateUser = async (userId, userData) => {
    try {
        await update(ref(database, 'users/' + userId), userData);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Function to create a new appointment
export const createAppointment = async (userId, appointmentData) => {
  try {
    const appointmentId = new Date().getTime();
    await set(ref(database, `users/${userId}/appointments/${appointmentId}`), {
      ...appointmentData,
      id: appointmentId,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

// Function to get user appointments
export const getUserAppointments = async (userId) => {
    try {
        const snapshot = await get(child(ref(database), `users/${userId}/appointments`));
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error getting user appointments:", error);
        throw error;
    }
};

// Function to create a new donation
export const createDonation = async (userId, donationData) => {
  try {
    const donationId = new Date().getTime();
    await set(ref(database, `users/${userId}/donations/${donationId}`), {
      ...donationData,
      id: donationId,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    throw error;
  }
};

// Function to get user donations
export const getUserDonations = async (userId) => {
    try {
        const snapshot = await get(child(ref(database), `users/${userId}/donations`));
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error getting user donations:", error);
        throw error;
    }
};