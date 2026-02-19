# Sticky Notes – React + TypeScript

## Overview
Single-page Sticky Notes app built with React + TypeScript.
Implements manual drag, resize, delete, edit, and local persistence.

## Features
- Create note
- Move by dragging
- Resize from corner
- Delete via Trash Zone
- Edit text
- Random colors
- LocalStorage persistence

## Architecture
State is managed in App.tsx using React hooks.
Each note is an isolated component.
Strict TypeScript typing ensures reliability.
Mouse interactions use native DOM events.

## Run

npm install
npm run dev

## Build

npm run build
