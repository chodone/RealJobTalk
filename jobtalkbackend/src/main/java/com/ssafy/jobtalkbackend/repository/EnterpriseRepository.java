package com.ssafy.jobtalkbackend.repository;

import com.ssafy.jobtalkbackend.domain.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EnterpriseRepository extends JpaRepository<Enterprise, Long>{

}
