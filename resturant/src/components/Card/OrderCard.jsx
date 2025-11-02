import { BasicButton } from "./../../styledComponents";
import styled, { ThemeProvider } from "styled-components";
import { useTranslation } from "../../hooks/useTranslation";

const Container = styled.div`
  margin: 1rem;
  border: 2px solid oklch(0.93 0.01 257.07);
  border-radius: 1rem;
  overflow: hidden;
  padding-bottom: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;

   @media (max-width: 768px) {
    flex-direction: column;
   }
`;

// Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  h3 {
    margin-bottom: 1rem;
    text-decoration: underline;
    color: ${({ theme }) => theme.accent};
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    h3 {
      text-align: center;
    }
  }
`;

// Cards wrapper
const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  transition: all 0.3s ease;
`;

// Single card
const Card = styled.div`
  width: 350px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: ${({ title }) =>
    title === "All menuitems" ? "start" : "center"};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
  }
  h5 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
  }

  p {
    font-size: 0.875rem;
    height: 75px;
    overflow: hidden;
    color: ${({ theme }) => theme.secondaryText};
    transition: color 0.3s ease;
  }

  h4 {
    margin-top: 0.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.accent};
    transition: color 0.3s ease;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    button {
      /* width: 1.5rem; */
      transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }

    @media (max-width: 768px) {
      width: 90%;
    }
  }
`;
const ActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background-color: ${({ theme }) => theme.primary };
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid ${({ theme }) => theme.border};
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.navbarBg};
    color: ${({ theme }) => theme.navbarText};
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;
const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
  }
`;
export function OrderCard({ data, title, onEdit, onDelete }) {
  const { t, language } = useTranslation();

  return (
    <>
      <Container style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
        <Header>
          <h3 className="mb-4 underline">{title}</h3>
        </Header>
        <CardsWrapper>
          {data.map(
            (order) => (
              console.log(order),
              (
                <Card key={order._id}>
                  <div >
                    <h5 >
                      {t("orderNo")} :{" "}
                      {new Date(order.orderNumber).toLocaleString()}
                    </h5>
                  </div>
                  <div >
                    <p >
                      <strong>{t("userName")}:</strong> {order.userID.userName}
                    </p>
                    <small >
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div >
                    <strong>{t("items")}:</strong>
                    {order && order.orderItems.length > 0 ? (
                      <Table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: "#f5f5f5" }}>
                            <th
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {t("itemName")}
                            </th>
                            <th
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {t("quantity")}
                            </th>
                            <th
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {t("price")}
                            </th>
                            <th
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {t("total")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.map((item) => {
                            const subTotal =
                              (item.price || 0) * (item.quantity || 0);
                            return (
                              <tr key={item._id}>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  {item.itemId?.name?.[language] || "No name"}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  {item.quantity}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  ${item.price}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ${subTotal}
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td
                              colSpan="3"
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                                textAlign: "right",
                                fontWeight: "bold",
                              }}
                            >
                              {t("total")}:
                            </td>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                                fontWeight: "bold",
                              }}
                            >
                              $
                              {order.orderItems.reduce(
                                (sum, item) =>
                                  sum +
                                  (item.price || 0) * (item.quantity || 0),
                                0
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : (
                      <p>{t("noItems")}</p>
                    )}
                  </div>
                  {/* <div className="d-flex justify-content-between"> */}
                  <div className="mt-5">
                    <ActionButton
                      style={{ marginRight: "1.5rem" }}
                      onClick={() => onEdit(order._id)}
                    >
                      {t("edit")}
                    </ActionButton>
                    <ActionButton onClick={() => onDelete(order._id)}>
                      {t("delete")}
                    </ActionButton>
                  </div>

                  
                </Card>
              )
            )
          )}
        </CardsWrapper>
      </Container>
    </>
  );
}
