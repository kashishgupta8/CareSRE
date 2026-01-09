/**
 * @fileoverview This file contains Firebase Cloud Functions for the CareSRE project.
 * It demonstrates how to read and write to various Firestore collections.
 */

import * as logger from "firebase-functions/logger";
import {onRequest} from "firebase-functions/v2/https";
import {onDocumentCreated} from "firebase-functions/v2/firestore";

// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

// Initialize the Firebase Admin SDK.
initializeApp();

/**
 * -----------------------------------------------------------------------------
 * HTTP-Triggered Functions
 * These functions are executed in response to an HTTP request.
 * -----------------------------------------------------------------------------
 */

/**
 * Creates a new insight in the 'admin_insights' collection.
 * This is an example of writing data to Firestore via an HTTP request.
 *
 * To trigger this function, send a POST request with a JSON body like:
 * { "title": "High Wait Times", "recommendation": "Allocate another doctor to Cardiology." }
 */
export const createAdminInsight = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const {title, recommendation} = req.body;
  if (!title || !recommendation) {
    res.status(400).send("Missing 'title' or 'recommendation' in request body.");
    return;
  }

  try {
    const insight = {
      title,
      recommendation,
      timestamp: new Date(),
      isActioned: false,
    };

    const writeResult = await getFirestore().collection("admin_insights").add(insight);
    logger.info(`Successfully created admin insight: ${writeResult.id}`);
    res.status(201).send({result: `Insight with ID: ${writeResult.id} added.`});
  } catch (error) {
    logger.error("Error creating admin insight:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Gets the status of a specific Outpatient Department (OPD).
 * This is an example of reading data from Firestore.
 *
 * To trigger this function, send a GET request with a query parameter:
 * e.g., /getOpdStatus?id=cardiology
 */
export const getOpdStatus = onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const opdId = req.query.id as string;
  if (!opdId) {
    res.status(400).send("Missing 'id' query parameter.");
    return;
  }

  try {
    const docRef = getFirestore().collection("opd_status").doc(opdId);
    const docSnap = await docRef.get();

    if (!docSnap.exists()) {
      logger.warn(`OPD status not found for id: ${opdId}`);
      res.status(404).send(`OPD with ID: ${opdId} not found.`);
      return;
    }

    logger.info(`Successfully fetched OPD status for: ${opdId}`);
    res.status(200).json(docSnap.data());
  } catch (error) {
    logger.error(`Error getting OPD status for ${opdId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});


/**
 * -----------------------------------------------------------------------------
 * Background-Triggered Functions
 * These functions are executed in response to events within Firebase.
 * -----------------------------------------------------------------------------
 */

/**
 * A background function that triggers whenever a new doctor is created.
 * This function logs the new doctor's registration.
 */
export const onDoctorCreate = onDocumentCreated("doctors/{doctorId}", (event) => {
  const doctorId = event.params.doctorId;
  const doctorData = event.data?.data();

  if (!doctorData) {
    logger.warn(`Doctor data not found for new doctor: ${doctorId}`);
    return;
  }

  const doctorName = doctorData.name || "Unknown";
  logger.log(`A new doctor, ${doctorName} (ID: ${doctorId}), has been registered.`);
});

/**
 * A background function that triggers whenever a new alert is created.
 * This function logs the details of the new alert. It could be extended
 * to send notifications via email or push notification.
 */
export const onAlertCreate = onDocumentCreated("alerts/{alertId}", (event) => {
  const alertId = event.params.alertId;
  const alertData = event.data?.data();

  if (!alertData) {
    logger.warn(`Alert data not found for new alert: ${alertId}`);
    return;
  }

  const alertType = alertData.type || "Generic Alert";
  const alertDetails = alertData.details || "No details provided.";

  logger.info(`New Alert [${alertType}]: ${alertDetails} (ID: ${alertId})`);
});
