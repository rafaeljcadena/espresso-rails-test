# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  belongs_to :company
  validates_associated :company
  accepts_nested_attributes_for :company

  enum role: { admin: 0, employee: 1 }

  validates :role, presence: true
  validates :email, uniqueness: true
end
