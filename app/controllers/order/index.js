const { send_response, uniqueId } = require("../../utils/app.util");
const { verifyToken } = require("../../utils/jwt.util");
const db = require("../../models");
const { Sequelize, QueryTypes } = require("sequelize");
const { sendFCM_OS, sendFCM_OC } = require("../../firebase");
const OrderMst = db.ordermst;
const Neworder = db.neworder;
const OrderDtl = db.orderdtl;
const Product = db.product;

exports.createorder = function (event, context) {
  var _data = event.body;
  verifyToken(event.headers)
    .then((auther) => {
      OrderMst.create({
        order_no: uniqueId(10),
        order_date: new Date(),
        order_location: _data.order_location,
        order_status: "B",
        merchant: _data.merchant,
        customer: _data.customer,
        rider: 1,
        created_by: auther,
        updated_by: auther,
      })
        .then((order) => {
          let items = [];
          _data.items.forEach((item) => {
            items.push({
              order_id: order.order_id,
              prod_id: item.prod_id,
              prod_qty: item.prod_qty,
              prod_price: item.prod_price,
              order_dtl_status: "B",
              prod_total_price: item.total_price,
              mercant_price: item.mercant_price,
              commission_amount: item.commission_amount,
              mercant_price_total: item.mercant_price_total,
              commission_amount_total: item.commission_amount_total,
              created_by: auther,
              updated_by: auther,
            });
          });
          console.log("items ", items);
          OrderDtl.bulkCreate(items, {
            returning: true,
          })
            .then((orderdtl) => {
              console.log(orderdtl);
              sendFCM_OC(order);
              context.done(null, send_response(200, order));
            })
            .catch((err) => {
              context.done(null, send_response(500, { message: err.message }));
            });
          // context.done(null, send_response(200, order));
        })
        .catch((err) => {
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.createorder_detail = function (event, context) {
  var _data = event.body;
  console.log(_data);
  console.log(event.headers);
  verifyToken(event.headers)
    .then((auther) => {
      OrderDtl.create({
        order_id: _data.order_id,
        prod_id: _data.prod_id,
        prod_qty: _data.prod_qty,
        prod_price: _data.prod_price,
        order_dtl_status: "B",
        prod_total_price: _data.total_price,
        created_by: auther,
        updated_by: auther,
      })
        .then((order) => {
          context.done(null, send_response(200, order));
        })
        .catch((err) => {
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.getorderslist = function (event, context) {
  console.log("*****query", event.queryParams.merchant_id);
  var filter = {
    include: [
      {
        model: Product,
        attributes: ["prod_name", "prod_id", "prod_desc"],
      },
      {
        model: OrderMst,
        attributes: ["order_id", "order_no", "order_date"],
        order: [["order_date"]],
        include: [
          {
            model: db.profile,
            attributes: [
              "profile_id",
              "profile_first_name",
              "profile_last_name",
              "profile_biz_name",
            ],
            as: "merchant_info",
          },
          {
            model: db.profile,
            attributes: [
              "profile_id",
              "profile_first_name",
              "profile_last_name",
              "profile_biz_name",
            ],
            as: "customer_info",
          },
        ],
        where: {
          user_id: event.queryParams.merchant_id,
        },
      },
    ],
    order: [["order_id"]],
  };
  verifyToken(event.headers)
    .then((auther) => {
      OrderDtl.findAndCountAll(filter)
        .then((ordermaster) => {
          context.done(null, send_response(200, ordermaster));
        })
        .catch((err) => {
          console.log(err);
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.getorderslist_merchant = function (event, context) {
  console.log("*****query", event.queryParams.merchant_id);
  var filter = {
    include: [
      {
        model: Product,
        attributes: ["prod_name", "prod_id", "prod_desc"],
      },
      {
        model: OrderMst,
        attributes: ["order_id", "order_no", "order_date"],
        order: [["order_date", "DESC"]],
        include: [
          {
            model: db.profile,
            attributes: [
              "profile_id",
              "profile_first_name",
              "profile_last_name",
              "profile_biz_name",
            ],
            as: "merchant_info",
          },
          {
            model: db.profile,
            attributes: [
              "profile_id",
              "profile_first_name",
              "profile_last_name",
              "profile_biz_name",
            ],
            as: "customer_info",
          },
        ],
        where: {
          merchant: event.queryParams.merchant_id,
        },
      },
    ],
    order: [["created_at", "DESC"]],
    // order: [['order_id']]
  };
  verifyToken(event.headers)
    .then((auther) => {
      OrderDtl.findAndCountAll(filter)
        .then((ordermaster) => {
          context.done(null, send_response(200, ordermaster));
        })
        .catch((err) => {
          console.log(err);
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.getorderslist_merchant_status = function (event, context) {
  console.log("*****query", event.queryParams.merchant_id);
  var filter = {
    include: [
      {
        model: Product,
        attributes: ["prod_name", "prod_id", "prod_desc"],
      },
      {
        model: OrderMst,
        attributes: ["order_id", "order_no", "order_date"],
        order: [["order_date", "DESC"]],
        include: [
          {
            model: db.profile,
            attributes: [
              "profile_id",
              "profile_first_name",
              "profile_last_name",
              "profile_biz_name",
            ],
            as: "merchant_info",
          },
          {
            model: db.profile,
            attributes: [
              "profile_id",
              "profile_first_name",
              "profile_last_name",
              "profile_biz_name",
            ],
            as: "customer_info",
          },
        ],
        where: {
          merchant: event.queryParams.merchant_id,
          status: event.queryParams.order_status,
        },
      },
    ],
    order: [["created_at", "DESC"]],
    // order: [['order_id']]
  };
  verifyToken(event.headers)
    .then((auther) => {
      OrderDtl.findAndCountAll(filter)
        .then((ordermaster) => {
          context.done(null, send_response(200, ordermaster));
        })
        .catch((err) => {
          console.log(err);
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.userordershistory = function (event, context) {
  console.log("********2", event.pathParams.user_id);
  let user_id = event.pathParams.user_id;
  var filter = {
    include: [
      {
        model: db.profile,
        attributes: [
          "profile_id",
          "profile_first_name",
          "profile_last_name",
          "profile_biz_name",
        ],
        as: "merchant_info",
      },
      {
        model: db.profile,
        attributes: [
          "profile_id",
          "profile_first_name",
          "profile_last_name",
          "profile_biz_name",
        ],
        as: "customer_info",
      },
    ],
    order: [["created_at", "DESC"]],
  };
  verifyToken(event.headers)
    .then((auther) => {
      Neworder.findAndCountAll(filter)
        .then((ordermaster) => {
          context.done(null, send_response(200, ordermaster));
        })
        .catch((err) => {
          console.log(err);
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.uservieworder = function (event, context) {
  console.log("********2", event.pathParams.user_id);
  let user_id = event.pathParams.user_id;
  var filter = {
    include: [
      {
        model: db.profile,
        attributes: [
          "profile_id",
          "profile_first_name",
          "profile_last_name",
          "profile_biz_name",
        ],
        as: "merchant_info",
      },
      {
        model: db.profile,
        attributes: [
          "profile_id",
          "profile_first_name",
          "profile_last_name",
          "profile_biz_name",
        ],
        as: "customer_info",
      },
    ],
    order: [["created_at", "DESC"]],
  };
  verifyToken(event.headers)
    .then((auther) => {
      Neworder.findOne(filter)
        .then((ordermaster) => {
          context.done(null, send_response(200, ordermaster));
        })
        .catch((err) => {
          console.log(err);
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.userorderslist = function (event, context) {
  OrderMst.findAndCountAll({
    where: { customer: event.pathParams.user_id },
  })
    .then((orders) => {
      console.log("Order - ", orders);
      context.done(null, send_response(200, orders));
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.updateorder_status = function (event, context) {
  var _data = event.body;
  verifyToken(event.headers)
    .then((auther) => {
      OrderDtl.update(
        {
          order_dtl_status: _data.order_dtl_status,
          order_dtl_id: _data.order_dtl_id,
          updated_by: auther,
        },
        {
          where: {
            order_dtl_id: event.pathParams.order_id,
          },
        }
      )
        .then((order) => {
          context.done(
            null,
            send_response(200, { message: "Order detail updated successfully" })
          );
        })
        .catch((err) => {
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.updateOrderStatus = function (event, context) {
  var _data = event.body;
  console.log("Data in******");
  console.log(_data);
  console.log(event.pathParams.order_id);
  verifyToken(event.headers)
    .then((auther) => {
      OrderMst.update(
        {
          order_status: _data.order_status,
          updated_by: auther,
        },
        {
          where: {
            order_id: event.pathParams.order_id,
          },
        }
      )
        .then((order) => {
          console.log(order);
          OrderMst.findOne({
            where: {
              order_id: event.pathParams.order_id,
            },
          })
            .then((order) => {
              console.log("Order MSt - ", order);
              sendFCM_OS(order);
            })
            .catch((err) => {
              console.log("Error -- ", err);
            });
          context.done(
            null,
            send_response(200, { message: "Order status updated successfully" })
          );
        })
        .catch((err) => {
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.listMerchantOrders = function (event, context) {
  var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
  var _limit = parseInt(
    event.queryParams.limit ? event.queryParams.limit : 100
  );
  var _merchant = event.queryParams.merchant_id;
  var _status = event.queryParams.order_status;

  var query =
    "SELECT SUM(d.prod_qty) AS prod_qty, SUM(d.prod_total_price) AS prod_total_price, d.order_dtl_status, m.order_id, m.order_no, m.order_date, m.order_location, m.order_status, me.profile_id AS merchant, cs.profile_id AS customer, cs.profile_first_name, cs.profile_last_name, cs.profile_location  FROM order_dtl d INNER JOIN order_mst m ON m.order_id = d.order_id  JOIN profile me ON me.profile_id = m.merchant INNER JOIN profile cs ON cs.profile_id = m.customer WHERE m.merchant = $merchant AND m.order_status = $ostatus GROUP BY m.order_id ORDER BY m.updated_at DESC";

  db.sequelize
    .query(query, {
      bind: { merchant: _merchant, ostatus: _status },
      raw: true,
      type: QueryTypes.SELECT,
    })
    .then((orders) => {
      if (orders.length > 0) {
        var lop = new Promise((resolve, reject) => {
          orders.forEach((order, index, array) => {
            db.sequelize
              .query(
                "SELECT d.prod_qty, d.prod_price, d.prod_total_price, p.prod_name, p.prod_desc, p.prod_id FROM order_dtl d INNER JOIN product p ON p.prod_id = d.prod_id WHERE d.order_id = $orderid ",
                {
                  bind: { orderid: order.order_id },
                  raw: true,
                  type: QueryTypes.SELECT,
                }
              )
              .then((dtls) => {
                console.log("Prod list ", dtls);
                order["order_prods"] = dtls;
                if (index === array.length - 1) resolve();
              });
          });
        });
        lop.then(() => {
          context.done(
            null,
            send_response(200, { count: orders.length, rows: orders })
          );
        });
      } else {
        context.done(
          null,
          send_response(200, { count: orders.length, rows: orders })
        );
      }
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.listMerchantOrderStatus = function (event, context) {
  var _merchant = event.queryParams.merchant_id;

  var query =
    "SELECT m.order_status, COUNT(*) AS total_orders FROM order_mst m WHERE m.merchant = $merchant GROUP BY m.order_status";

  db.sequelize
    .query(query, {
      bind: { merchant: _merchant },
      raw: true,
      type: QueryTypes.SELECT,
    })
    .then((orders) => {
      context.done(
        null,
        send_response(200, { count: orders.length, rows: orders })
      );
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.merchantWallet = function (event, context) {
  var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
  var _limit = parseInt(
    event.queryParams.limit ? event.queryParams.limit : 100
  );
  var _merchant = event.pathParams.merchant_id;

  db.sequelize
    .query(
      "select sum(d.prod_qty) as prod_qty, d.prod_price, sum(d.prod_total_price) as prod_total_price, d.order_dtl_status, m.order_id, m.order_no, m.order_date, m.order_location, m.order_status, p.prod_id, group_concat(concat(p.prod_name, ' x ', d.prod_qty)) as prod_name, p.prod_desc, me.profile_id as merchant, cs.profile_id as customer, cs.profile_first_name, cs.profile_last_name, cs.profile_location  from order_dtl d inner join order_mst m on m.order_id = d.order_id inner join product p on p.prod_id = d.prod_id inner join profile me on me.profile_id = m.merchant inner join profile cs on cs.profile_id = m.customer where m.order_status = 'B' group by m.order_id order by m.created_at desc",
      {
        bind: { merchant: _merchant },
        raw: true,
        type: QueryTypes.SELECT,
      }
    )
    .then((orders) => {
      context.done(
        null,
        send_response(200, { count: orders.length, rows: orders })
      );
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.listWallets = function (event, context) {
  var _filter = event.body;
  console.log("Entered");
  var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
  var _limit = parseInt(
    event.queryParams.limit ? event.queryParams.limit : 100
  );
  var query =
    "SELECT sum(d.prod_qty) AS prod_qty, d.prod_price, sum(d.prod_total_price) AS prod_total_price, m.order_id, m.order_no, m.order_date, m.order_location, m.order_status, p.prod_id, group_concat(concat(p.prod_name, ' x ', d.prod_qty)) AS prod_name, p.prod_desc, me.profile_id AS merchant, me.profile_first_name AS merchant_first_name, me.profile_last_name AS merchant_last_name, me.profile_biz_name AS business_name, me.profile_biz_type AS business_typ, me.profile_location AS business_location, me.city, me.state, me.country, cs.profile_id AS customer, cs.profile_first_name, cs.profile_last_name, cs.profile_location  FROM order_dtl d INNER JOIN order_mst m ON m.order_id = d.order_id INNER JOIN product p ON p.prod_id = d.prod_id INNER JOIN profile me ON me.profile_id = m.merchant INNER JOIN profile cs ON cs.profile_id = m.customer WHERE m.order_status = 'B' ";
  if (_filter.country) {
    query += ` AND me.p_country_name = '${_filter.country}' `;
  }
  if (_filter.state) {
    query += ` AND me.p_state_name = '${_filter.state}'`;
  }
  if (_filter.sortby && _filter.sortval) {
    if (_filter.sortby == "Y") {
      query += ` AND DATE_FORMAT(m.order_date, '%Y') = '${_filter.sortval}' `;
    } else if (_filter.sortby == "M") {
      query += ` AND DATE_FORMAT(m.order_date, '%Y-%m') = '${_filter.sortval}' `;
    } else if (_filter.sortby == "D") {
      query += ` AND DATE_FORMAT(m.order_date, '%Y-%m-%d') = '${_filter.sortval}' `;
    }
  }
  if (_filter.merchant) {
    query += ` AND me.profile_id = ${_filter.merchant}`;
  }
  query += " GROUP BY m.order_id ORDER BY m.created_at DESC";
  // console.log('Query Filter ---- ', query);
  db.sequelize
    .query(query, {
      raw: true,
      type: QueryTypes.SELECT,
    })
    .then((orders) => {
      console.log("Orders - ", orders);
      if (orders.length > 0) {
        var lw = new Promise((resolve, reject) => {
          orders.forEach((order, index, array) => {
            db.sequelize
              .query(
                "SELECT d.prod_qty, d.prod_price, d.prod_total_price, p.prod_name, p.prod_desc, p.prod_id FROM order_dtl d INNER JOIN product p ON p.prod_id = d.prod_id WHERE d.order_id = $orderid ",
                {
                  bind: { orderid: order.order_id },
                  raw: true,
                  type: QueryTypes.SELECT,
                }
              )
              .then((dtls) => {
                console.log("Prod list ", dtls);
                order["order_prods"] = dtls;
                if (index === array.length - 1) resolve();
              });
          });
        });
        lw.then(() => {
          console.log("All done!");
          context.done(
            null,
            send_response(200, { count: orders.length, rows: orders })
          );
        });
      } else {
        context.done(
          null,
          send_response(200, { count: orders.length, rows: orders })
        );
      }
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.walletToday = function (event, context) {
  var _merchant = event.body.merchant;
  var _current_date = event.body.date;
  console.log("_current_date", _current_date);
  db.sequelize
    .query(
      "SELECT order_time AS hrs, SUM(prod_total_price) AS amount FROM (SELECT m.order_id, m.order_date, DATE_FORMAT(m.created_at, '%H') AS order_time, sum(d.prod_total_price) AS prod_total_price FROM order_dtl d INNER JOIN order_mst m ON m.order_id = d.order_id WHERE m.order_status = 'B' AND DATE_FORMAT(m.order_date, '%Y-%m-%d') = DATE_FORMAT($current_date, '%Y-%m-%d') AND m.merchant = $merchant GROUP BY m.order_id ORDER BY m.created_at DESC) AS daydtl GROUP BY order_time ",
      {
        bind: { merchant: _merchant, current_date: _current_date },
        raw: true,
        type: QueryTypes.SELECT,
      }
    )
    .then((orders) => {
      context.done(
        null,
        send_response(200, { count: orders.length, rows: orders })
      );
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.walletMonth = function (event, context) {
  console.log("****Tested******");
  var _merchant = event.body.merchant;
  var _current_date = event.body.date;
  console.log("**********", _merchant);
  db.sequelize
    .query(
      "SELECT order_dt AS dat, SUM(prod_total_price) AS amount FROM (SELECT m.order_id, m.order_date, DATE_FORMAT(m.order_date, '%d') AS order_dt, sum(d.prod_total_price) AS prod_total_price FROM order_dtl d INNER JOIN order_mst m ON m.order_id = d.order_id WHERE m.order_status = 'B' AND DATE_FORMAT(m.order_date, '%Y-%m') = DATE_FORMAT($current_date, '%Y-%m') AND m.merchant = $merchant GROUP BY m.order_id ORDER BY m.created_at DESC) AS daydtl GROUP BY order_dt",
      {
        bind: { merchant: _merchant, current_date: _current_date },
        raw: true,
        type: QueryTypes.SELECT,
      }
    )
    .then((orders) => {
      context.done(
        null,
        send_response(200, { count: orders.length, rows: orders })
      );
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.walletYear = function (event, context) {
  var _merchant = event.body.merchant;
  var _current_date = event.body.date;
  console.log("Yearly in", _merchant);
  db.sequelize
    .query(
      "SELECT order_month AS mnth, SUM(prod_total_price) AS amount FROM (SELECT m.order_id, m.order_date, DATE_FORMAT(m.order_date, '%m') AS order_month, sum(d.prod_total_price) AS prod_total_price FROM order_dtl d INNER JOIN order_mst m ON m.order_id = d.order_id WHERE m.order_status = 'B' AND DATE_FORMAT(m.order_date, '%Y') = DATE_FORMAT($current_date, '%Y') AND m.merchant = $merchant GROUP BY m.order_id ORDER BY m.created_at DESC) AS daydtl GROUP BY order_month",
      {
        bind: { merchant: _merchant, current_date: _current_date },
        raw: true,
        type: QueryTypes.SELECT,
      }
    )
    .then((orders) => {
      console.log("Year summary - ", orders);
      context.done(
        null,
        send_response(200, { count: orders.length, rows: orders })
      );
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};
