# Task Tracker App - Product Requirements Document

## Overview
A minimalist task tracker application focusing on time tracking, task categorization, and cross-device synchronization using existing cloud infrastructure (iCloud/Google Drive).

## Epics and Features

### Epic 1: Task Management
- Create new tasks with following attributes:
  - Task title/description
  - Category/type
  - Classification (Leverage/Neutral/Overhead)
  - Auto-captured creation timestamp
  - Status (Not Started/In Progress/Completed/Blocked/Paused)
- Edit existing tasks
- Delete tasks
- View task list with sorting/filtering capabilities

### Epic 2: Time Tracking
- Start timer for tasks
  - Auto-capture start time
- Stop/complete tasks
  - Auto-capture end time
  - Auto-calculate time spent
- Pause/resume capability
- View time analytics
  - Time spent per task
  - Time spent per category
  - Time spent on leverage vs overhead tasks

### Epic 3: Task Notes & Reflections
- Add comments/reflections to tasks
- Edit existing comments
- View comment history per task
- Timestamp for comments

### Epic 4: Cloud Sync
- Setup cloud storage integration
  - iCloud Drive integration
  - Google Drive integration (alternative)
- Real-time sync across devices
- Offline capability with sync queue
- Conflict resolution

### Epic 5: User Interface
- Clean, minimal interface
- Task input form
- Task list view
- Time tracking controls
- Comments/reflection input
- Basic analytics dashboard
- Responsive design for all devices

## MVP Features (Phase 1)
1. Basic task creation with title and classification
2. Start/stop time tracking
3. Simple comments field
4. Basic cloud sync (single cloud provider)
5. Minimal viable UI for desktop and mobile

## Future Enhancements (Phase 2)
1. Multiple categories/tags
2. Advanced analytics
3. Multiple cloud provider support
4. Batch operations
5. Export capabilities 