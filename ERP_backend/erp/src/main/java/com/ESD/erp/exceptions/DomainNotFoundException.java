package com.ESD.erp.exceptions;

public class DomainNotFoundException extends RuntimeException{
    public DomainNotFoundException(Integer id){
        super("Could not found the user with id "+id);
    }
}
