import React from 'react';
export default function Admin() {

  return (
    <div className='my-3'>
      <p>Admin Works!!</p>

      <b>Manage Role</b>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Role Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Role Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Role Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Role Description" />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}
