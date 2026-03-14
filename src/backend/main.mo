import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Product = {
    #driedVegetables;
    #driedGinger;
    #pickles;
    #driedGreenChillyPowder;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    productInterest : Product;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Text.compare(inquiry1.name, inquiry2.name);
    };
  };

  let inquiries = Map.empty<Principal, Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, message : Text, productInterest : Product) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      phone;
      message;
      productInterest;
    };
    inquiries.add(caller, inquiry);
  };

  public shared ({ caller }) func adminGetAllInquiries() : async [Inquiry] {
    if (inquiries.isEmpty()) { Runtime.trap("There are no inquiries!") };
    inquiries.values().toArray().sort();
  };

  public shared ({ caller }) func adminGetInquiriesByProduct(product : Product) : async [Inquiry] {
    let filteredInquiries = List.empty<Inquiry>();
    for (inquiry in inquiries.values()) {
      if (inquiry.productInterest == product) {
        filteredInquiries.add(inquiry);
      };
    };
    let filteredArray = filteredInquiries.toArray();
    if (filteredArray.isEmpty()) {
      Runtime.trap("No inquiries found for this product.");
    };
    filteredArray;
  };

  public query ({ caller }) func getProductList() : async [Product] {
    [#driedVegetables, #driedGinger, #pickles, #driedGreenChillyPowder];
  };
};
