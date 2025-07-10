# Privacy Policy

## Overview

GPS Coordinate Selector is a frontend-only application that prioritizes user privacy and data protection. This document outlines how the application handles user data and privacy considerations.

## Data Collection

### Information We Collect

**Location Data:**
- GPS coordinates from device geolocation API
- Map position and zoom level data
- Accuracy measurements for GPS readings

**User-Generated Content:**
- Audio recordings (temporary, for transcription only)
- Photos from camera or gallery (temporary, for OCR processing only)
- Text notes entered manually
- Generated OSM tags from processed content

**Application Data:**
- Event logs for debugging purposes
- User interface interaction data
- Application performance metrics

### How Data is Collected

- **GPS Location**: Only collected when user explicitly requests location services
- **Media Content**: Only captured when user initiates recording or photo capture
- **Notes**: Only stored when user creates content
- **Logs**: Generated automatically for application functionality

## Data Storage

### Local Storage

**What's Stored Locally:**
- All notes and coordinate data until user chooses to export
- Application preferences and settings
- Event logs for current session
- Temporary media files during processing

**Storage Location:**
- Browser's localStorage and IndexedDB
- No data stored on external servers by default

### Data Persistence

- Notes persist across browser sessions until explicitly deleted or exported
- Clearing browser data will remove all stored information
- No automatic backup or cloud synchronization

## Data Sharing

### External API Integration

**When Data is Shared:**
- Audio files sent to transcription API only when user requests transcription
- Images sent to OCR API only when user requests text extraction
- Notes sent to OSM tag generation API only when user requests tag generation
- Complete data sent to storage API only when user chooses to export

**What's Shared:**
- GPS coordinates (with user consent)
- Media content (temporarily, for processing only)
- Text notes (for OSM tag generation only)

**Data Retention by External APIs:**
- This application does not control external API data retention policies
- Users should review external service privacy policies
- Media files are sent for processing purposes only

### No Third-Party Tracking

- No analytics or tracking services implemented
- No cookies used for tracking purposes
- No user profiling or behavioral analysis
- No data sharing with advertising networks

## User Rights

### Data Control

**User Can:**
- View all stored coordinate and note data
- Edit or delete any notes at any time
- Choose when to send data to external APIs
- Export data at any time
- Clear all local data through browser settings

**User Cannot:**
- Retrieve data once browser storage is cleared
- Access data stored by external APIs directly through this app
- Recover permanently deleted notes

### Data Portability

- All data can be exported in standard formats
- Export includes coordinates, notes, and OSM tags
- No vendor lock-in or proprietary data formats

## Security Measures

### Local Security

- Data stored using browser security standards
- No sensitive data transmitted without user consent
- Secure API communication using HTTPS only

### API Communication

- All external API calls use encrypted connections
- Coordinates sent only with user-generated content
- No automatic or background data transmission

## Location Services

### GPS Usage

**Purpose:**
- Providing initial map positioning
- Coordinate accuracy display
- User-requested location finding

**User Control:**
- Geolocation requires explicit user permission
- Can be disabled in browser settings
- Application functions without location access

**Data Handling:**
- GPS data not transmitted automatically
- Only sent to external APIs when user chooses to export notes
- No location tracking or monitoring

## Children's Privacy

This application is not specifically designed for children under 13. Parents should supervise usage and understand that:

- Location data may be collected
- Photos and audio may be processed by external services
- No parental controls are built into the application

## Data Breach Response

In the unlikely event of a security issue:

- Users will be notified through the application interface
- Recommended actions will be clearly communicated
- Contact information will be provided for further assistance

## Changes to Privacy Policy

- Policy updates will be reflected in this document
- Version number and date will be updated
- Significant changes will be highlighted in the changelog

## Contact Information

For privacy-related questions or concerns:

- **Project Author**: Adam Gąsowski
- **Repository**: See README.md for contact information
- **Issues**: Use the project's issue tracker for privacy concerns

## Compliance

This application is designed to respect:

- Browser privacy settings and permissions
- User consent requirements
- Data minimization principles
- Transparent data handling practices

## Last Updated

**Version**: 0.1.0  
**Date**: July 10, 2025

Users are encouraged to review this privacy policy periodically for any updates or changes.