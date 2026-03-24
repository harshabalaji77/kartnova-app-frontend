// CustomModal.jsx
import React, { useEffect, useState } from "react";
import "../styles/modalStyles.css";

const CustomModal = ({ modalType, onClose, onSubmit, response }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const [inputValue, setInputValue] = useState(""); // Generalized input for all cases

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneralInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (modalType) {
      case "addProduct": {
        const processedData = {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
          categoryId: parseInt(formData.categoryId, 10),
        };
        onSubmit(processedData);
        break;
      }
      case "deleteProduct": {
        const productId = parseInt(inputValue, 10);
        onSubmit({ productId });
        break;
      }
      case "viewUser": {
        const userId = parseInt(inputValue, 10);
        onSubmit({ userId });
        break;
      }
      case "modifyUser": {
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const role = formData.get("role");
        const userId = parseInt(inputValue, 10);
        const data = {
          username,
        };
        onSubmit(userId);
        break;
      }
      case "monthlyBusiness": {
        const month = formData.month;
        const year = formData.year;
        onSubmit({ month, year });
        break;
      }
      case "dailyBusiness": {
        const date = formData.date;
        onSubmit({ date });
        break;
      }

      case "yearlyBusiness": {
        const year = formData.year;
        onSubmit({ year });
        break;
      }

      case "overallBusiness": {
        onSubmit();
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Add Product Form */}
        {modalType === "addProduct" &&
          (!response ? (
            <>
              <div className="modal-header">
                <h2>Add Product</h2>
                <button className="modal-close-btn" onClick={onClose}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="modal-form-item">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="modal-form-item">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div className="modal-form-item">
                    <label htmlFor="stock">Stock:</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>

                  <div className="modal-form-item">
                    <label htmlFor="categoryId">Category ID:</label>
                    <input
                      type="number"
                      id="categoryId"
                      name="categoryId"
                      placeholder="1"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className="modal-form-item">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="modal-form-item">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter product description..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-actions">
                <button type="button" className="modal-btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="modal-btn-primary" onClick={handleSubmit}>
                  Add Product
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-header">
                <h2>Product Added Successfully</h2>
                <button className="modal-close-btn" onClick={onClose}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="full-products">
                  <div className="product-details img">
                    <img src={response.product.imageUrl} alt={response?.product?.product?.name} />
                  </div>
                  <div className="product-details-info">
                    <div className="product-details">
                      <div className="">Name:</div>
                      <div className="">{response?.product?.product?.name}</div>
                    </div>
                    <div className="product-details">
                      <div className="">Description:</div>
                      <div className="">
                        {response?.product?.product?.description}
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="">Price:</div>
                      <div className="">${response?.product?.product?.price}</div>
                    </div>
                    <div className="product-details">
                      <div className="">Stock:</div>
                      <div className="">{response?.product?.product?.stock}</div>
                    </div>
                    <div className="product-details">
                      <div className="">Category:</div>
                      <div className="">
                        {response?.product?.product?.category.categoryName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="modal-btn-primary" onClick={onClose}>
                  Close
                </button>
              </div>
            </>
          ))}

        {/* Delete Product Form */}
        {modalType === "deleteProduct" &&
          (!response ? (
            <>
              <div className="modal-header">
                <h2>Delete Product</h2>
                <button className="modal-close-btn" onClick={onClose}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="modal-form-item">
                    <label htmlFor="productId">Product ID:</label>
                    <input
                      type="number"
                      id="productId"
                      placeholder="Enter Product ID"
                      value={inputValue}
                      onChange={handleGeneralInputChange}
                      required
                      min="1"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-actions">
                <button type="button" className="modal-btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="modal-btn-danger" onClick={handleSubmit}>
                  Delete Product
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-header">
                <h2>Product Deleted Successfully</h2>
                <button className="modal-close-btn" onClick={onClose}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="business-response-item">
                  <div>Status:</div>
                  <div style={{ color: 'var(--success)' }}>Success</div>
                </div>
                <div className="business-response-item">
                  <div>Message:</div>
                  <div>{response?.message || 'Product has been deleted successfully'}</div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="modal-btn-primary" onClick={onClose}>
                  Close
                </button>
              </div>
            </>
          ))}

        {/* View User Details Form */}
        {modalType === "viewUser" && (
          <>
            <div className="modal-header">
              <h2>View User Details</h2>
              <button className="modal-close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-form-item">
                  <label htmlFor="userId">User ID:</label>
                  <input
                    type="number"
                    id="userId"
                    placeholder="Enter User ID"
                    value={inputValue}
                    onChange={handleGeneralInputChange}
                    required
                    min="1"
                  />
                </div>
              </form>
            </div>
            <div className="modal-actions">
              <button type="button" className="modal-btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="modal-btn-primary" onClick={handleSubmit}>
                View User
              </button>
            </div>
          </>
        )}

        {/* Response Display */}
        {modalType === "response" && response && (
          <>
            <div className="modal-header">
              <h2>{response.user ? 'User Details' : 'Response'}</h2>
              <button className="modal-close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {response.user ? (
                <div className="user-details">
                  <div className="business-response-item">
                    <div>User ID:</div>
                    <div>{response.user.userId}</div>
                  </div>
                  <div className="business-response-item">
                    <div>Username:</div>
                    <div>{response.user.username}</div>
                  </div>
                  <div className="business-response-item">
                    <div>Email:</div>
                    <div>{response.user.email}</div>
                  </div>
                  <div className="business-response-item">
                    <div>Role:</div>
                    <div>{response.user.role}</div>
                  </div>
                  <div className="business-response-item">
                    <div>Created At:</div>
                    <div>{new Date(response.user.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="business-response-item">
                    <div>Updated At:</div>
                    <div>{new Date(response.user.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
              ) : (
                <div className="business-response-item">
                  <div style={{ color: 'var(--danger)' }}>Error:</div>
                  <div>{response.message || 'Something went wrong.'}</div>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button className="modal-btn-primary" onClick={onClose}>
                Back to Admin
              </button>
            </div>
          </>
        )}
        {modalType === "monthlyBusiness" && (
          <>
            <div className="modal-header">
              <h2>Monthly Business Report</h2>
              <button className="modal-close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {!response ? (
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="modal-form-item">
                    <label htmlFor="month">Month:</label>
                    <input
                      type="number"
                      id="month"
                      name="month"
                      placeholder="10"
                      min="1"
                      max="12"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-form-item">
                    <label htmlFor="year">Year:</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      placeholder="2025"
                      min="2020"
                      max="2030"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              ) : (
                <div>
                  <div className="business-response-item">
                    <div>Total Business:</div>
                    <div>₹{response?.monthlyBusiness?.totalBusiness?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.monthlyBusiness?.categorySales || {})?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.monthlyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <div className="modal-actions">
              {!response && (
                <>
                  <button type="button" className="modal-btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="modal-btn-primary" onClick={handleSubmit}>
                    Get Report
                  </button>
                </>
              )}
              {response && (
                <button className="modal-btn-primary" onClick={onClose}>
                  Close
                </button>
              )}
            </div>
          </>
        )}

        {modalType === "dailyBusiness" && (
          <>
            <div className="modal-header">
              <h2>Daily Business Report</h2>
              <button className="modal-close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {!response ? (
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="modal-form-item">
                    <label htmlFor="date">Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              ) : (
                <div>
                  <div className="business-response-item">
                    <div>Total Business:</div>
                    <div>₹{response?.dailyBusiness?.totalBusiness?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.dailyBusiness?.categorySales || {})?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.dailyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <div className="modal-actions">
              {!response && (
                <>
                  <button type="button" className="modal-btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="modal-btn-primary" onClick={handleSubmit}>
                    Get Report
                  </button>
                </>
              )}
              {response && (
                <button className="modal-btn-primary" onClick={onClose}>
                  Close
                </button>
              )}
            </div>
          </>
        )}

        {modalType === "yearlyBusiness" && (
          <>
            <div className="modal-header">
              <h2>Yearly Business Report</h2>
              <button className="modal-close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {!response ? (
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="modal-form-item">
                    <label htmlFor="year">Year:</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      placeholder="2025"
                      min="2020"
                      max="2030"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              ) : (
                <div>
                  <div className="business-response-item">
                    <div>Total Business:</div>
                    <div>₹{response?.yearlyBusiness?.totalBusiness?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.yearlyBusiness?.categorySales || {})?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.yearlyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <div className="modal-actions">
              {!response && (
                <>
                  <button type="button" className="modal-btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="modal-btn-primary" onClick={handleSubmit}>
                    Get Report
                  </button>
                </>
              )}
              {response && (
                <button className="modal-btn-primary" onClick={onClose}>
                  Close
                </button>
              )}
            </div>
          </>
        )}

        {modalType === "overallBusiness" && (
          <>
            <div className="modal-header">
              <h2>Overall Business Report</h2>
              <button className="modal-close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {!response ? (
                <div className="modal-form">
                  <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Click the button below to get the overall business report since inception.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="business-response-item">
                    <div>Total Business:</div>
                    <div>₹{response?.overallBusiness?.totalBusiness?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.overallBusiness?.categorySales || {})?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.overallBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <div className="modal-actions">
              {!response && (
                <>
                  <button type="button" className="modal-btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="modal-btn-primary" onClick={handleSubmit}>
                    Get Overall Business
                  </button>
                </>
              )}
              {response && (
                <button className="modal-btn-primary" onClick={onClose}>
                  Close
                </button>
              )}
            </div>
          </>
        )}

        {/* ModifyUser */}
        {modalType === "modifyUser" && (
          <ModifyUserFormComponent onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default CustomModal;

const ModifyUserFormComponent = ({ onClose }) => {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [updated, setUpdated] = useState(false);

  const handleFetchUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userid = formData.get("user-id");

      if (!userid) return;

      const response = await fetch(`/admin/user/getbyid`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userid }),
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUserId(userid);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const role = formData.get("role");

    try {
      const response = await fetch(`/admin/user/modify`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: +userId,
          username: username,
          email: email,
          role: role,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        setUpdated(true);
        setUserDetails(user);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  if (!userDetails) {
    return (
      <>
        <div className="modal-header">
          <h2>Modify User</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <form className="modal-form" onSubmit={handleFetchUser}>
            <div className="modal-form-item">
              <label htmlFor="user-id">User ID:</label>
              <input
                type="text"
                id="user-id"
                name="user-id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                required
              />
            </div>
          </form>
        </div>
        <div className="modal-actions">
          <button type="button" className="modal-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="modal-btn-primary" onClick={handleFetchUser}>
            Get User
          </button>
        </div>
      </>
    );
  }

  if (userDetails && !updated) {
    return (
      <>
        <div className="modal-header">
          <h2>Modify User</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <form className="modal-form" onSubmit={handleUpdateUser}>
            <div className="modal-form-item">
              <label htmlFor="user-id">User ID:</label>
              <input
                type="text"
                id="user-id"
                name="user-id"
                value={userId}
                readOnly
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={userDetails?.username}
                required
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userDetails?.email}
                required
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                defaultValue={userDetails?.role}
                required
              />
            </div>
          </form>
        </div>
        <div className="modal-actions">
          <button type="button" className="modal-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="modal-btn-primary" onClick={handleUpdateUser}>
            Update User
          </button>
        </div>
      </>
    );
  }

  if (updated) {
    return (
      <>
        <div className="modal-header">
          <h2>User Updated Successfully</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="business-response-item">
            <div>User ID:</div>
            <div>{userDetails.userId}</div>
          </div>
          <div className="business-response-item">
            <div>Username:</div>
            <div>{userDetails.username}</div>
          </div>
          <div className="business-response-item">
            <div>Email:</div>
            <div>{userDetails.email}</div>
          </div>
          <div className="business-response-item">
            <div>Role:</div>
            <div>{userDetails.role}</div>
          </div>
        </div>
        <div className="modal-actions">
          <button className="modal-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </>
    );
  }

  return null;
};