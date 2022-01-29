import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <Link to="#" class="navbar-brand">Movie</Link>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
    </div>
  )
}
